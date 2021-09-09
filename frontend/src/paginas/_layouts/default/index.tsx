import React from 'react';
import { SvgIconProps } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CreateIcon from '@material-ui/icons/Create';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LockIcon from '@material-ui/icons/Lock';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import CodeIcon from '@material-ui/icons/Code';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';

import { useStyles } from "./styles";

//import SideMenu from '../../../components/SideMenu';
//import AppHeader from '../../../components/AppHeader';

interface SubMenuOption {
  id: string;
  icon: React.ReactElement<SvgIconProps>;
  text: string;
  route: string;
}

export interface MenuOption {
  id: string;
  icon: React.ReactElement<SvgIconProps>;
  text: string;
  route: string;
  subMenuOptions: SubMenuOption[]
}

const DefaultLayout: React.FC = ({ children }) => {
	const classes = useStyles();

  const options: MenuOption[] = [
    { id: '00', icon: <HomeIcon />, text: 'Home', route: '/dashboard', subMenuOptions: [] },
    { id: '10', icon: <LibraryAddCheckIcon />, text: 'Projetos', route: '', subMenuOptions: [
      { id: '10010', icon: <LocationCityIcon />, text: 'Empresas', route: '' },
      { id: '10020', icon: <CloudUploadIcon />, text: 'Arquivos', route: '' },
    ]},
    { id: '20', icon: <ViewComfyIcon />, text: 'Planilhas', route: '', subMenuOptions: [
      { id: '20010', icon: <PlaylistAddCheckIcon />, text: 'Cruzamentos', route: '' },
      { id: '20020', icon: <AttachMoneyIcon />, text: 'Balancetes', route: '' },
    ]},
    { id: '30', icon: <CreateIcon />, text: 'Ajustes', route: '', subMenuOptions: [
      { id: '30010', icon: <MenuBookIcon />, text: 'ECF', route: '' },
    ]},
    { id: '40', icon: <LockIcon />, text: 'Segurança', route: '', subMenuOptions: [
      { id: '40010', icon: <AccountTreeIcon />, text: 'Módulos', route: '/modules' },
      { id: '40020', icon: <CodeIcon />, text: 'Rotinas', route: '' },
      { id: '40030', icon: <GroupIcon />, text: 'Grupos de Usuários', route: '' },
      { id: '40040', icon: <PersonIcon />, text: 'Usuários', route: '' }
    ]}
  ];

	return (
    <div className={classes.root}>
      {/*<AppHeader />
      <SideMenu options={options} />*/}
      <main className={classes.content}>
        { children }
      </main>
    </div>
  );
};

export default DefaultLayout;
