import styled from "@emotion/styled";

export const ActivativeButton = styled.button`
  width: 100%;
  padding: 16px 24px;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  border: 0;
  border-radius: 16px;
  background-color: ${(props) => (props.disabled ? '#A8A8A8' : '#3680FF')};
  pointer: cursor;
  
`;
