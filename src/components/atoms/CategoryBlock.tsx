import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

interface ICategoryBlocks {
    name: string;
    href: string;
    onContextMenu: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const StyledLink = styled(Link)`
    text-decoration: none;
    width: 120px;
    height: 120px;
    border: 2px solid ${({theme}) => theme.categoryBorder};
    color: ${({theme}) => theme.fontColor};
    font-family: ${({theme}) => theme.secondaryFont};
    font-size: 1.1em;
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background .3s;
    word-break: break-word;
    overflow-wrap: break-word;
    text-align: center;
    padding: 5px;

    &:hover {
        background: ${({theme}) => darken(0.020, theme.primary)};
    }

    @media (max-width: 825px) {
        margin: auto;
    }
`

const CategoryBlock = ({name, href, onContextMenu}: ICategoryBlocks) => {
    return (
        <StyledLink onContextMenu={onContextMenu} to={href}>
            {name}
        </StyledLink>
    );
};

export default CategoryBlock;