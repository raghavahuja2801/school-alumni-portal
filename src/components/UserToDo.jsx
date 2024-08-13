import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const ContainerBox = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoticeBox = styled.div`
    width: 40%;
    background-color: #FFD902;
    padding: 50px;
    margin: 15px;
    border-radius: 1dvb;
    justify-content: center;
    display: flex;
    flex-direction: row;
`

const CircullarBox = styled.div`
    background-color: rgb(0	152	179)	;
    width: 40%;
    padding: 50px;
    margin: 15px;
    border-radius: 1dvb;
    display: flex;
    justify-content: center;
    flex-direction: row;
`

const UserToDo = () => {


    return (

        <ContainerBox>
            <NoticeBox>
                Notices
                <span class="material-symbols-outlined">
                    assignment_turned_in
                </span>
            </NoticeBox>
            <CircullarBox>
                Circullars
                <span class="material-symbols-outlined">
                    assignment_late
                </span>
            </CircullarBox>
        </ContainerBox>
    );
};

export default UserToDo;
