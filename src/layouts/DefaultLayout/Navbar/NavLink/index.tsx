import { CaretDown } from 'phosphor-react';
import { ReactNode, MouseEvent } from 'react';

import { StyledLink, ButtonClose, DropdownButton } from './styles';

interface NavbarProps {
  children?: ReactNode;
  iconName?: any;
  label: string;
  to: string;
  compact: boolean;
  navMobile?: boolean;
  subMenusId?: boolean;
  subLinks?: {
    id: number;
    to: string;
    label: string;
  }[];
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export function NavLink({
  children,
  iconName,
  label,
  compact,
  subMenusId,
  subLinks,
  onClick,
  ...rest
}: NavbarProps) {
  return (
    <StyledLink end compact={compact ? 0 : 1} onClick={onClick} {...rest}>
      {children || (
        <>
          <div>
            {iconName ? <i>{iconName}</i> : <> </>}

            <ButtonClose type="button">
              <span>{label}</span>
            </ButtonClose>
          </div>

          {subLinks ? (
            <DropdownButton
              type="button"
              subMenus={subMenusId ? 0 : 1}
              compact={compact ? 0 : 1}
            >
              <CaretDown size={24} />
            </DropdownButton>
          ) : (
            <> </>
          )}
        </>
      )}
    </StyledLink>
  );
}
