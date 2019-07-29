import {Brightness2 as DarkThemeIcon, Brightness6 as LightThemeIcon, Palette as PaletteIcon} from '@material-ui/icons';
import React, {useState} from 'react';
import {IconButton, Typography, Menu, MenuItem} from '@material-ui/core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ThemeActions} from '../../actions';
import Header from '../../components/header';
import {THEME} from '../../constants';
import THEMES from '../../themes';
import ContentLayout from '../content-layout';

const mapStateToProps = state => ({
    id: state.theme.id,
    type: state.theme.type
});

const mapDispatchToProps = dispatch => ({
    themeActions: bindActionCreators(ThemeActions, dispatch)
});

type Props = {
    themeActions: {setThemeId: any => void, setLightTheme: any => void, setDarkTheme: any => void},
    id: string,
    type: string
};

const AppHeader = ({themeActions, id, type}: Props) => {
    const {setThemeId, setLightTheme, setDarkTheme} = themeActions;

    const isLightTheme = type === THEME.LIGHT;
    const toggleThemeType = isLightTheme ? setDarkTheme : setLightTheme;

    const [themeMenuAnchorEl, setThemeMenuAnchorEl] = useState(null);

    const themeMenuId = 'theme-menu-id';
    const openThemeMenu = (e) => setThemeMenuAnchorEl(e.currentTarget);
    const closeThemeMenu = () => setThemeMenuAnchorEl(null);
    const handleThemeMenuClick = (themeId) => () => {
        if (id !== themeId) {
            setThemeId(themeId);
        }

        closeThemeMenu();
    };

    const ThemeMenu = () => (
        <Menu
            anchorEl={themeMenuAnchorEl}
            id={themeMenuId}
            keepMounted={true}
            onClose={closeThemeMenu}
            open={Boolean(themeMenuAnchorEl)}
        >
            {
                (THEMES || []).map((theme, index) => (
                    <MenuItem
                        button={true}
                        component={'li'}
                        key={index}
                        onClick={handleThemeMenuClick(theme.id)}
                    >
                        {theme.name}
                    </MenuItem>
                ))
            }
        </Menu>
    );

    return (
        <Header
            alignItems={'center'}
            justify={'space-between'}
        >
            <Typography
                variant={'h5'}
            >
                {'Title'}
            </Typography>
            <ContentLayout
                direction={'row'}
            >
                <IconButton
                    color={'inherit'}
                    href={null}
                    onClick={toggleThemeType}
                >
                    {
                        isLightTheme
                            ? <LightThemeIcon/>
                            : <DarkThemeIcon/>
                    }
                </IconButton>
                <IconButton
                    aria-controls={themeMenuId}
                    aria-haspopup={'true'}
                    color={'inherit'}
                    href={null}
                    onClick={openThemeMenu}
                >
                    <PaletteIcon/>
                </IconButton>
                <ThemeMenu/>
            </ContentLayout>
        </Header>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);