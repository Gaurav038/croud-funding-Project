import styled from 'styled-components';
import Link from 'next/link';

const HeaderLogo = () => {
  return (
    <Link passHref href={'/'}>
      <Logo>Fund-Raising</Logo>
    </Link>
  )
}

const Logo = styled.h1`
  font-weight: normal;
  font-size: 40px;
  margin-left: 11px;
  font-family: 'Praise';
  letter-spacing: 3px;
  cursor: pointer;
`

export default HeaderLogo