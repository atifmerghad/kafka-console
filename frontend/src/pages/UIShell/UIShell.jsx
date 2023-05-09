import React from "react";
import {
    HeaderContainer, Header, SkipToContent, HeaderMenuButton, HeaderName,
    HeaderNavigation, HeaderMenu, HeaderMenuItem, HeaderGlobalBar,
    HeaderGlobalAction, SideNav, SideNavItems, Content,
    SideNavMenu, SideNavMenuItem, Theme
} from '@carbon/react';
import {
    Notification,
    Search,
    Switcher,
    Fade,
} from '@carbon/react/icons';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';

import ErrorBoundary from "../../components/ErrorBoundary";
import LandingPage from '../LandingPage';
import BrokerPage from '../BrokerPage';
import TopicPage from '../TopicPage';
import TopicDetails from '../TopicPage/TopicDetails';
import MetricPage from '../MetricPage';
import GroupPage from '../GroupPage';
import SecurityPage from '../SecurityPage';
import NotFound from '../../components/NotFound';
import NotConfigured from '../../components/NotConfigured';



class UIShell extends React.Component {

    isDark = true;
    constructor(props) {
      super(props);
      this.state = {
        activeItem: `/${window.location.pathname.split('/')[1] ?? ''}`
      };
    }

    render() {
        return (
         
            <BrowserRouter >
               <Theme > 
                    <HeaderContainer
                        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                            <div>
                                <Header aria-label="IBM Platform Name">
                                    <SkipToContent />
                                    <HeaderMenuButton
                                        aria-label="Open menu"
                                        onClick={onClickSideNavExpand}
                                        isActive={isSideNavExpanded}
                                    />
                                    <HeaderName href="#" prefix="KAFKA">
                                        [Tower]
                                    </HeaderName>
                                    <HeaderNavigation aria-label="Carbon React App">
                                        {/*<HeaderMenuItem href="#">Contributing</HeaderMenuItem>*/}
                                        <HeaderMenuItem href="#">Contact</HeaderMenuItem>
                                        {/* 
                                        <HeaderMenu aria-label="How To" menuLinkName="How To">
                                            <HeaderMenuItem href="#one">Sub-link 1</HeaderMenuItem>
                                            <HeaderMenuItem href="#two">Sub-link 2</HeaderMenuItem>
                                            <HeaderMenuItem href="#three">Sub-link 3</HeaderMenuItem>
                                        </HeaderMenu>
                                        */}
                                    </HeaderNavigation>
                                    <HeaderGlobalBar>
                                        <HeaderGlobalAction
                                            aria-label="Search"
                                            tooltipAlignment="end">
                                            <Search size={20} />
                                        </HeaderGlobalAction>
                                        <HeaderGlobalAction
                                            aria-label="Notifications"
                                            tooltipAlignment="end">
                                            <Notification size={20} />
                                        </HeaderGlobalAction>
                                        <HeaderGlobalAction
                                            aria-label="App Switcher"
                                            tooltipAlignment="end">
                                            <Switcher size={20} />
                                        </HeaderGlobalAction>
                                    </HeaderGlobalBar>
                                    <ErrorBoundary>
                                        <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
                                            <SideNavItems>
                                                <SideNavMenuItem element={Link} to='/'
                                                    isActive={this.state.activeItem === '/'}
                                                    onClick={() => { this.setState({ activeItem: '/' }) }}>
                                                    Overview
                                                </SideNavMenuItem>
                                                <SideNavMenuItem element={Link} to='/brokers'
                                                    isActive={this.state.activeItem === '/brokers'}
                                                    onClick={() => { this.setState({ activeItem: '/brokers' }) }}>
                                                    Brokers
                                                </SideNavMenuItem>
                                                <SideNavMenuItem element={Link} to='/topics'
                                                    isActive={this.state.activeItem === '/topics'}
                                                    onClick={() => { this.setState({ activeItem: '/topics' }) }}>
                                                    Topics
                                                </SideNavMenuItem>
                                                <SideNavMenuItem element={Link} to='/schemas'
                                                    isActive={this.state.activeItem === '/schemas'}
                                                    onClick={() => { this.setState({ activeItem: '/schemas' }) }}>
                                                    Schema Registry
                                                </SideNavMenuItem>
                                                <SideNavMenuItem element={Link} to='/groups'
                                                    isActive={this.state.activeItem === '/groups'}
                                                    onClick={() => { this.setState({ activeItem: '/groups' }) }}>
                                                    Consumer Groups
                                                </SideNavMenuItem>
                                                <SideNavMenuItem element={Link} to='/metrics'
                                                    isActive={this.state.activeItem === '/metrics'}
                                                    onClick={() => { this.setState({ activeItem: '/metrics' }) }}>
                                                    Metrics
                                                </SideNavMenuItem>
                                                <SideNavMenuItem element={Link} to='/security'
                                                    isActive={this.state.activeItem === '/security'}
                                                    onClick={() => { this.setState({ activeItem: '/security' }) }}>
                                                    Security
                                                </SideNavMenuItem>
                                                <SideNavMenuItem element={Link} to='/connectors'
                                                    isActive={this.state.activeItem === '/connectors'}
                                                    onClick={() => { this.setState({ activeItem: '/connectors' }) }}>
                                                    Connectors
                                                </SideNavMenuItem>
                                                <SideNavMenuItem element={Link} to='/ksqldb'
                                                    isActive={this.state.activeItem === '/ksqldb'}
                                                    onClick={() => { this.setState({ activeItem: '/ksqldb' }) }}>
                                                    KSQLDB
                                                </SideNavMenuItem>
                                                <SideNavMenuItem element={Link} to='/track'
                                                    isActive={this.state.activeItem === '/track'}
                                                    onClick={() => { this.setState({ activeItem: '/track' }) }}>
                                                    Track
                                                </SideNavMenuItem>
                                                {/*
                                                <SideNavMenu renderIcon={Fade} title="Inventory" defaultExpanded>
                                                    <SideNavMenuItem element={Link} to='/inventory/items'
                                                        isActive={this.state.activeItem === '/inventory/items'}
                                                        onClick={() => { this.setState({ activeItem: '/inventory/items' }) }}>
                                                        Items
                                                    </SideNavMenuItem>
                                                </SideNavMenu>
                                                <SideNavMenu renderIcon={Fade} title="Management">
                                                    <SideNavMenuItem href="#">
                                                        Link
                                                    </SideNavMenuItem>
                                                    <SideNavMenuItem href="#">
                                                        Link
                                                    </SideNavMenuItem>
                                                    <SideNavMenuItem href="#">
                                                        Link
                                                    </SideNavMenuItem>
                                                </SideNavMenu>
                                                <SideNavMenu
                                                    renderIcon={Fade}
                                                    title="Docs">
                                                    <SideNavMenuItem href="#">
                                                        Link
                                                    </SideNavMenuItem>
                                                    <SideNavMenuItem href="#">
                                                        Link
                                                    </SideNavMenuItem>
                                                </SideNavMenu>
                                                */}
                                            </SideNavItems>
                                        </SideNav>
                                    </ErrorBoundary>
                                </Header>
                            </div>
                        )}
                    />
                <Content className={this.isDark?'content dark':'content light'} >
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/brokers" element={<BrokerPage/>} />
                        <Route path="/topics" element={<TopicPage />} />
                        <Route path="/topic-details" element={<TopicDetails />} />
                        <Route path="/groups" element={<GroupPage />} />
                        <Route path="/metrics" element={<MetricPage />} />  
                        <Route path="/security" element={<SecurityPage />} />    
                        <Route path="/schemas" element={<NotConfigured serviceName={'Schema Registry'} />} />
                        <Route path="/connectors" element={<NotConfigured serviceName={'Kafka Connect'} />} />
                        <Route path="/track" element={<NotFound />} />
                        <Route path="/*" element={<NotFound />} />                       
                    </Routes>
                </Content>
                </Theme>
            </BrowserRouter> 
          
        );
    }
}

export default UIShell;
