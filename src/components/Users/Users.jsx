import React from "react";
import {Skeleton} from '../Skeleton/Skeleton';
import {User} from './User';
import Search from "../Icons/Search";

export const Users = ({items, isLoading, users, searchValue, onChangeSearchValue, onClickInvites, invites, onClickSendInvites}) => {
    return (
        <>
            <div className="search">
                <Search/>
                <input type="text" placeholder="Найти пользователя..." value={searchValue} onChange={onChangeSearchValue}/>
            </div>
            {isLoading ? (
                <div className="skeleton-list">
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                </div>
            ) : (
                <ul className="users-list">
                    {users.filter((user) => {
                        const fullName = (user.first_name + user.last_name).toLowerCase();
                        if(fullName.includes(searchValue.toLowerCase()) || user.email.toLowerCase().includes(searchValue.toLowerCase())) {
                            return true;
                    }
                    }).map((user) => (<User avatar={user.avatar} first_name={user.first_name} last_name={user.last_name} email={user.email} onClickInvites={onClickInvites} invites={invites} id={user.id}></User>))}
                </ul>
            )}
            <button disabled={0==invites.length} className="send-invite-btn" onClick={onClickSendInvites}>Отправить приглашение</button>
        </>
            );
        };

export default Users;