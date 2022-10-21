import React, { ReactNode } from 'react';
import './Header.scss';

export type HeaderProps = {
    title?: string;
    icon?: ReactNode;
    size?: BigInteger;
}

const Header = ({ title, icon, size }: HeaderProps) => {
    return (
        <header className="header">
            <div className="icons">
                {icon}
            </div>
            <div className="text">{title}</div>
        </header>
    )
}

export default Header;