import React, { FC, ComponentPropsWithoutRef } from 'react';
import cn from 'classnames';

import './styles.scss';

export const Card: FC<ComponentPropsWithoutRef<'div'>> = ({
    className,
    ...props
}) => <div className={cn('mtfh-search-card', className)} {...props} />;
