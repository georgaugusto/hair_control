import { Dispatch, SetStateAction } from 'react';
import { CaretDown } from 'phosphor-react';

import { Button } from './styles';

interface INavToggleProps {
  compact: boolean;
  setCompact: Dispatch<SetStateAction<boolean>>;
  setSubMenus: Dispatch<SetStateAction<boolean>>;
}

export function NavToggle({
  compact,
  setCompact,
  setSubMenus,
  ...props
}: INavToggleProps) {
  return (
    <Button
      compact={compact ? 0 : 1}
      className="nav-toggle"
      onClick={() => {
        setSubMenus(false);
        setCompact(!compact);
      }}
      {...props}
    >
      <CaretDown />
    </Button>
  );
}
