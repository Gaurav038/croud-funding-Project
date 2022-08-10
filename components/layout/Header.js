import styled from 'styled-components';
import HeaderLogo from './HeadComp/HeaderLogo'
import HeaderNav from './HeadComp/HeaderNav'
import HeaderRight from './HeadComp/HeaderRight'

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderLogo />
      <HeaderNav />
      <HeaderRight />
    </HeaderWrapper>
  )
};

const HeaderWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default Header