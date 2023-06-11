import React from "react";
import {
    Header, SideNav, SideNavItems, SideNavMenuItem
} from '@carbon/react';

import { Link } from 'react-router-dom';

const SideMenu = () => {
        return (
            <div>
                    <SideNav aria-label="Side navigation" expanded={true}>
                        <SideNavItems>
                            <SideNavMenuItem element={Link} to='/dashboard'>
                                Overview
                            </SideNavMenuItem>
                            <SideNavMenuItem element={Link} to='/brokers'>
                                Brokers
                            </SideNavMenuItem>
                            <SideNavMenuItem element={Link} to='/topics'>
                                Topics
                            </SideNavMenuItem>
                            <SideNavMenuItem element={Link} to='/schemas'>
                                Schema Registry
                            </SideNavMenuItem>
                            <SideNavMenuItem element={Link} to='/groups'>
                                Consumer Groups
                            </SideNavMenuItem>
                            <SideNavMenuItem element={Link} to='/metrics'>
                                Metrics
                            </SideNavMenuItem>
                            <SideNavMenuItem element={Link} to='/security'>
                                Security
                            </SideNavMenuItem>
                            <SideNavMenuItem element={Link} to='/connectors'>
                                Connectors
                            </SideNavMenuItem>
                            <SideNavMenuItem element={Link} to='/ksqldb'>
                                KSQLDB
                            </SideNavMenuItem>
                            <SideNavMenuItem element={Link} to='/track'>
                                Track
                            </SideNavMenuItem>
                           
                        </SideNavItems>
                    </SideNav>
        </div>
        );
}

export default SideMenu;
