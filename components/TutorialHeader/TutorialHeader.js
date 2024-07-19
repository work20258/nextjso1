import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  SideNavMenu,
  SideNavMenuItem,
} from "@carbon/react";
import { Switcher, Notification, UserAvatar,Fade } from "@carbon/icons-react";

import Link from "next/link";

const TutorialHeader = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="Carbon Tutorial">
        <SkipToContent />
        <HeaderMenuButton aria-label="Open menu"
          onClick={onClickSideNavExpand} isActive={isSideNavExpanded}
        />
        <Link href="/" passHref legacyBehavior>
          <HeaderName prefix="IBM">Smart BD</HeaderName>
        </Link>
        
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}
          href="#main-content"
        >
          <SideNavItems>
           <Link href="/rolepermission" passHref legacyBehavior>
                <SideNavMenuItem >RolePermission</SideNavMenuItem>
            </Link>
            <Link href="/test" passHref legacyBehavior>
                <SideNavMenuItem >test</SideNavMenuItem>
            </Link>
            <SideNavMenu title="Large menu 1">
                  <Link href="/repos" passHref legacyBehavior>
                    <SideNavMenuItem>repos</SideNavMenuItem>
                   </Link> 
                   <Link href="/repos1" passHref legacyBehavior>
                    <SideNavMenuItem>repos1</SideNavMenuItem>
                   </Link>   
                   <Link href="/rolemanagement" passHref legacyBehavior>
                    <SideNavMenuItem>rolemanagement</SideNavMenuItem>
                   </Link>  
              </SideNavMenu>      
          </SideNavItems>
        </SideNav>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Notifications"
            tooltipAlignment="center"
            className="action-icons"
          >
            <Notification size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="User Avatar"
            tooltipAlignment="center"
            className="action-icons"
          >
            <UserAvatar size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="App Switcher" tooltipAlignment="end">
            <Switcher size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    )}
  />
);

export default TutorialHeader;