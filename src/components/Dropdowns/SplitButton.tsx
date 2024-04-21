import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const options = ['Xác Nhận', 'Giao Hàng', 'Hủy Đơn'];

const SplitButton = ({ status, onStatusChange }: { status: any, onStatusChange: (status: string) => void }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [color, setColor] = React.useState('');
    const [orderStatus, setOrderStatus] = React.useState('');

    React.useEffect(() => {
        if (status === 'PLACED') {
            setColor('rgb(255 167 11)');
            // onStatusChange('CONFIRMED');
        } else if (status === 'CONFIRMED'){
            // onStatusChange('SHIPPED');
            setColor('#3490dc');
        } else if (status === 'SHIPPED'){
            // onStatusChange('CANCELLED');
            setColor('rgb(211 64 83')
        }
        if (orderStatus === 'PLACED' || orderStatus === 'CONFIRMED') {
            setColor('rgb(255 167 11)');
        } else if (orderStatus === 'SHIPPED') {
            setColor('#3490dc');
        } else if (orderStatus === 'CANCELLED') {
            setColor('rgb(211 64 83');
        }

    }, [orderStatus, status])

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        let newStatus = '';
        if (index === 0) {
            newStatus = 'CONFIRMED';
        } else if (index === 1) {
            newStatus = 'SHIPPED';
        } else if(index===2) {
            newStatus = 'CANCELLED';
        }
        setOrderStatus(newStatus);
        onStatusChange(newStatus); 
        setOpen(false);
    };
    

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup
                variant="contained"
                ref={anchorRef}
                aria-label="Button group with a nested menu"
            >
                <Button style={{ backgroundColor: color}} className='w-auto' onClick={handleToggle}>
                    <div className='flex'>
                        <div className=''>
                            {
                                color === 'rgb(255 167 11)' ? options[0] : color === '#3490dc' ? options[1] : color === 'rgb(211 64 83' && options[2]
                            }
                        </div>
                        <div className='flex justify-center items-center translate-x-2'>
                            <ArrowDropDownIcon />
                        </div>
                    </div>

                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                            disabled = {(option === "Xác Nhận" && status==='CONFIRMED') || (option === "Giao Hàng" && status === 'PLACED') || (option === 'Xác Nhận' &&status === 'SHIPPED') || (option === 'Giao Hàng' &&status === 'SHIPPED')}
                                            
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}

export default SplitButton;