import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const OrderItem = () => {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem className='grid grid-cols-4'>
                {/* <div className='flex col-span-1 w-full'>
                    <div className='-translate-x-3'>
                        <img src="http://res.cloudinary.com/ddnepfewc/image/upload/v1712498219/m8ukjzlnd4jqrfojftwe.jpg" width={40} height={60} alt="" />
                    </div>
                    <div className='col-span-1 w-full'>
                        <div className='font-medium text-black'>
                            <p> Cà Phê Sữa <span>x1</span></p>
                        </div>
                        <p className='text-sm'>
                            Size: M
                        </p>
                        <p className='text-sm'>
                            Topping: Kem
                        </p>
                    </div>
                </div>
                <div className='col-span-1 w-full'>
                    Số lượng
                </div>
                <div className='col-span-1 w-full'>
                    Đơn Giá
                </div>
                <div className='col-span-1 w-full'>
                    Tổng Giá
                </div> */}
                <table className='w-full table-auto'>
                    <thead>
                        <tr>
                            <th>Mặt Hàng</th>
                            <th>Số lượng</th>
                            <th>Đơn Giá</th>
                            <th>Tổng Giá</th>
                        </tr>
                    </thead>
                </table>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Summer BBQ"
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                to Scott, Alex, Jennifer
                            </Typography>
                            {" — Wish I could come, but I'm out of town this…"}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Oui Oui"
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Sandra Adams
                            </Typography>
                            {' — Do you have Paris recommendations? Have you ever…'}
                        </React.Fragment>
                    }
                />
            </ListItem>
        </List>
    );
}

export default OrderItem;