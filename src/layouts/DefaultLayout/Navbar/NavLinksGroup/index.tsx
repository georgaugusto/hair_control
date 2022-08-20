/* eslint-disable no-unused-vars */
import ReactTooltip from '@huner2/react-tooltip';
import { MouseEvent, useState } from 'react';
// import ReactTooltip from 'react-tooltip';

import { Can } from '../../../../components/Can';
import { links } from '../Links';
import { NavLink } from '../NavLink';

import { LinksGroup, SubMenusLinks } from './styles';

interface INavLinksGroup {
  compact: boolean;
  subMenus: boolean;
  navMobile: boolean;
  showSubMenus: () => void;
  showNavMobile: () => void;
}

export function NavLinksGroup({
  subMenus,
  showSubMenus,
  showNavMobile,
  navMobile,
  compact,
  ...props
}: INavLinksGroup) {
  const [subMenusId, setSubMenusId] = useState<Array<number>>([]);

  const handleSignOut = () => {
    window.localStorage.clear();
  };

  function menuEventControl(
    event: MouseEvent<HTMLElement>,
    subLinks: any,
    action: any,
    id: any,
  ) {
    if (compact && subLinks) {
      event.preventDefault();
    }

    if (!compact && subLinks) {
      showSubMenus && showSubMenus();
      event.preventDefault();
      subMenusId.indexOf(id) === -1
        ? subMenusId.push(id)
        : subMenusId.splice(subMenusId.indexOf(id), 1);
    }

    if (navMobile && subLinks) {
      showSubMenus && showSubMenus();
      subMenusId.indexOf(id) === -1
        ? subMenusId.push(id)
        : subMenusId.splice(subMenusId.indexOf(id), 1);
      event.preventDefault();
    }

    if (navMobile && !subLinks) {
      showNavMobile && showNavMobile();
    }

    if (action) {
      handleSignOut();
    }
  }

  function closeNavMobile() {
    if (navMobile) {
      showNavMobile && showNavMobile();
    }
  }

  function check() {
    if (navMobile) {
      return compact;
    }
    return !compact;
  }

  function reactTooltipSubMenus(l: any) {
    if (navMobile || !compact) {
      return <> </>;
    }
    return (
      <ReactTooltip
        className="ReactTooltipCustomeStyles"
        id="tooltip"
        effect="solid"
        place="right"
        backgroundColor="#1E40AF"
        delayHide={150}
        delayShow={50}
        delayUpdate={500}
        getContent={(dataTip) =>
          l.id === Number(dataTip) &&
          l.subLinks?.map((sb: any) => (
            <SubMenusLinks key={sb.to} to={sb.to}>
              {sb.label}
            </SubMenusLinks>
          ))
        }
      />
    );
  }

  return (
    <LinksGroup compact={compact ? 0 : 1} {...props}>
      {links.map((l) => {
        return (
          <Can key={l.to} profiles={l?.profile}>
            <NavLink
              compact={compact}
              subMenusId={subMenusId.includes(l.id)}
              to={l?.to}
              iconName={l.icon}
              label={l.label}
              subLinks={l.subLinks}
              data-for={l.subLinks ? `tooltip` : ''}
              data-tip={l.id}
              onClick={(event) =>
                menuEventControl(event, l.subLinks, l.action, l.id)
              }
            />

            {check() &&
              subMenusId.includes(l.id) &&
              l.subLinks?.map((sb) => (
                <NavLink
                  compact={compact}
                  key={sb.to}
                  to={sb.to}
                  label={sb.label}
                  onClick={() => closeNavMobile()}
                />
              ))}

            {reactTooltipSubMenus(l)}
          </Can>
        );
      })}
    </LinksGroup>
  );
}
