import React from "react";

import { Icon, IconProps } from "@mtfh/common/lib/components";

export const Active = (props: Omit<IconProps, "viewBox">): JSX.Element => (
  <Icon viewBox="0 0 12 12" {...props}>
    <circle cx="6" cy="6" r="6" fill="#84BD00" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 6.87562L3.15137 5.63148L4.80371 7.54878L8.78548 3L9.94027 4.29127L4.80371 9.97679L2 6.87562Z"
      fill="white"
    />
  </Icon>
);

export const InActive = (props: Omit<IconProps, "viewBox">): JSX.Element => (
  <Icon viewBox="0 0 12 12" {...props}>
    <circle cx="6" cy="6" r="6" fill="#979797" />
    <path fill="#fff" d="M2 5h8v2H2z" />
  </Icon>
);
