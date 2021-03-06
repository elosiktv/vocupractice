import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { theme } from '../../theme/theme';

type fontColor = 'edit' | 'delete' | 'export' | 'import' | 'white' | 'normal';

interface IButtonIcon {
    fontColor: fontColor;
    iconType: any;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    href?: string;
    fontSize?: string;
    [key: string]: any;
}

interface ContainerProps {
    fontcolor: fontColor;
    fontSize?: string;
}

const handleFontColorType = (color: fontColor) => {
    switch(color) {
        case "import":
            return theme.importColor;
        case "export":
            return theme.exportColor;
        case "edit":
            return theme.editColor;
        case "delete":
            return theme.deleteColor;
        case "white":
            return theme.fontColor;
        case "normal":
            return theme.fontColorSecondary;
        default: return theme.secondary;
    }
}

const ContainerButton = styled.button<ContainerProps>`
    color: ${({fontcolor}) => handleFontColorType(fontcolor)};
    background: none;
    border: none;
    cursor: pointer;
    font-size: ${({fontSize}) => fontSize ? fontSize : '1em'};
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    width: 25px;
    height: 25px;
`

const ContainerLink = styled(Link)<ContainerProps>`
    color: ${({theme, fontcolor}) => fontcolor === 'edit' ? theme.editColor : theme.deleteColor};
    background: none;
    border: none;
    cursor: pointer;
    font-size: ${({fontSize}) => fontSize ? fontSize : '1em'};
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    width: 25px;
    height: 25px;
`

const ButtonIcon = ({fontColor, iconType, onClick, href, fontSize, ...props}: IButtonIcon) => {
    if (href) {
        return (
            <ContainerLink fontSize={fontSize} to={href} fontcolor={fontColor} {...props}>
                <FontAwesomeIcon icon={iconType} />
            </ContainerLink>
        )
    } else {
        return (
            <ContainerButton fontSize={fontSize} onClick={onClick} fontcolor={fontColor} {...props}>
                <FontAwesomeIcon icon={iconType} />
            </ContainerButton>
        );
    }
};

export default ButtonIcon;