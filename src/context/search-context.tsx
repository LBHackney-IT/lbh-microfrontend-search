import React, {
  Dispatch,
  FC,
  Reducer,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import { stringify } from "query-string";

import type { PersonSearchResult } from "@mtfh/common/lib/api/person/v1";
import { AxiosSWRError, useAxiosSWR } from "@mtfh/common/lib/http";

import { config } from "../services";
import {
  AssetSearchResult,
  LimitOptions,
  OrderByOptions,
  PersonSortOptions,
  TenureSearchResult,
} from "../types";

interface SearchResults {
  results: {
    persons?: PersonSearchResult[];
    tenures?: TenureSearchResult[];
    assets?: AssetSearchResult[];
  };
  total: number;
}

export type SearchState = {
  searchText: string;
  page: number;
  pageSize: LimitOptions;
  results?: PersonSearchResult[] | TenureSearchResult[] | AssetSearchResult[];
  total?: number;
  error?: AxiosSWRError;
} & (
  | {
      type: "persons";
      sort: PersonSortOptions;
      order: OrderByOptions;
    }
  | {
      type: "tenures";
      sort: null;
      order: null;
    }
  | {
      type: "assets";
      sort: null;
      order: null;
    }
);

export type SearchActions =
  | {
      type: "PAGE";
      payload: number;
    }
  | {
      type: "TYPE";
      payload: SearchState["type"];
    }
  | {
      type: "SEARCH";
      payload: string;
    }
  | {
      type: "LIMIT";
      payload: LimitOptions;
    }
  | {
      type: "SORT";
      payload: PersonSortOptions;
    }
  | {
      type: "ORDER";
      payload: OrderByOptions;
    };

interface SearchProviderProps {
  initial: Pick<SearchState, "type"> & Partial<Omit<SearchState, "type">>;
}

const getInitialState = (
  options: SearchProviderProps["initial"] = {
    type: "persons",
  }
): SearchState => {
  const searchConfig = {
    page: options.page || 1,
    searchText: options.searchText || "",
    pageSize: options.pageSize || LimitOptions.SMALL,
  };

  if (options.type === "persons") {
    return {
      ...searchConfig,
      type: options.type,
      sort: options.sort || PersonSortOptions.BEST,
      order: options.order || OrderByOptions.ASC,
    };
  }

  return {
    ...searchConfig,
    type: options.type,
    pageSize: options.pageSize || LimitOptions.SMALL,
    sort: null,
    order: null,
  };
};

export const SearchContext = createContext<{
  state: SearchState;
  dispatch: Dispatch<SearchActions>;
}>({
  state: getInitialState(),
  dispatch: /* istanbul ignore next */ () => {},
});

export const SearchProvider: FC<SearchProviderProps> = ({
  children,
  initial,
}) => {
  const reducer: Reducer<SearchState, SearchActions> = (state, action) => {
    switch (action.type) {
      case "SEARCH": {
        return {
          ...state,
          searchText: action.payload,
        };
      }
      case "TYPE": {
        return getInitialState({ ...state, type: action.payload });
      }
      case "PAGE": {
        return {
          ...state,
          page: action.payload,
        };
      }
      case "LIMIT": {
        if (Object.values(LimitOptions).includes(action.payload)) {
          return {
            ...state,
            pageSize: action.payload,
          };
        }
        return state;
      }
      case "SORT": {
        if (
          state.type === "persons" &&
          Object.values(PersonSortOptions).includes(action.payload)
        ) {
          return {
            ...state,
            sort: action.payload,
          };
        }
        return state;
      }
      case "ORDER": {
        if (
          state.type === "persons" &&
          Object.values(OrderByOptions).includes(action.payload)
        ) {
          return {
            ...state,
            order: action.payload,
          };
        }
        return state;
      }
      default: {
        return state;
      }
    }
  };

  const inititalState = getInitialState(initial);

  const [state, dispatch] = useReducer(reducer, inititalState);
  const { type, ...query } = state;

  const { data, error } = useAxiosSWR<SearchResults>(
    state.searchText
      ? `${config.searchApiUrl}/search/${type}?${stringify(
          {
            searchText: query.searchText,
            page: query.page,
            pageSize: query.pageSize,
            sortBy: query.sort,
            isDesc: query.order === "asc",
            ...(type === "assets" && {
              assetTypes: "Dwelling,LettableNonDwelling",
            }),
          },
          {
            skipEmptyString: true,
          }
        )}`
      : null,
    {
      refreshWhenHidden: false,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (data?.total && data.total > 0) {
      const totalPages = Math.ceil(data.total / state.pageSize);
      if (state.page > totalPages) {
        dispatch({ type: "PAGE", payload: totalPages });
      }
    }
  }, [state.page, data?.total, state.pageSize]);

  const value = useMemo(
    () => ({
      state: {
        ...state,
        results: data?.results[type],
        total: data?.total,
        error,
      },
      dispatch,
    }),
    [state, data, type, error, dispatch]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

interface PersistSearchContextURLProps {
  sessionKey?: string;
}

export const PersistSearchContextURL = ({
  sessionKey,
}: PersistSearchContextURLProps): null => {
  const {
    state: { type, searchText, page, pageSize, order, sort },
  } = useContext(SearchContext);
  const { push } = useHistory();

  useEffect(() => {
    const query = new URLSearchParams({ s: searchText });
    if (page > 1) {
      query.set("p", String(page));
    }

    if (pageSize !== LimitOptions.SMALL) {
      query.set("l", String(pageSize));
    }

    if (order && order !== OrderByOptions.ASC) {
      query.set("o", order);
    }

    if (sort) {
      query.set("sort", sort);
    }

    const path = `${type}?${query.toString()}`;
    push(path);

    if (sessionKey) {
      window.sessionStorage.setItem(sessionKey, path);
    }
  }, [type, searchText, page, pageSize, order, sort, sessionKey, push]);

  return null;
};

interface SearchURLProviderProps {
  sessionKey?: string;
  redirect: string;
}

export const SearchURLProvider: FC<SearchURLProviderProps> = ({
  children,
  redirect,
  sessionKey,
}): JSX.Element => {
  const { replace } = useHistory();
  const { type = "assets" } = useParams<{ type?: SearchState["type"] }>();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const searchText = query.get("s") || "";
  const page = Number(query.get("p") || 1);
  const pageSize = Number(query.get("l") || 12);
  const sortBy = query.get("sort");
  const orderBy = query.get("o");

  useEffect(() => {
    if (!searchText) {
      replace(redirect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sort = useMemo(() => {
    if (type === "persons") {
      if (sortBy === "surname") {
        return PersonSortOptions.SURNAME;
      }
      return PersonSortOptions.BEST;
    }
    return null;
  }, [type, sortBy]);

  const order = useMemo(() => {
    if (type === "persons") {
      if (orderBy === "desc") {
        return OrderByOptions.DESC;
      }
    }
    return OrderByOptions.ASC;
  }, [type, orderBy]);

  return (
    <SearchProvider
      initial={{
        type,
        searchText,
        page,
        sort,
        order,
        pageSize,
      }}
    >
      {children}
      <PersistSearchContextURL sessionKey={sessionKey} />
    </SearchProvider>
  );
};
