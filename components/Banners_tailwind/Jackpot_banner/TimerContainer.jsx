import styled, { keyframes } from 'styled-components';

// Статическая анимация вращения
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const TimerContainer = styled.div`
  position: relative;
  z-index: 0;
  width: 200px;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;  

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
    animation: ${rotate} 4s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 2px;
    top: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background: #14181f;
    border-radius: 12px;
  }
`;
