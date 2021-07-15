import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
  CForm,
  CInput,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { ReactComponent as SearchIcon } from '../assets/icons/ic_outline-search.svg'

// routes config
import routes from '../routes'

import { 
  TheHeaderDropdown,
  TheHeaderDropdownSetting,
}  from './index'

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  return (
    <CHeader className="header">
      <CHeaderBrand className="">
        <span>Application Portofolio Management (APM) Dashboard</span>
      </CHeaderBrand>

      <CHeaderNav className="px-3 header-nav">
        <CForm inline>
          <CButton color="light" className="btn-search my-2 my-sm-0" type="submit"><SearchIcon className="header-icon"/></CButton>
          <CInput
            className="header-search mr-sm-2"
            placeholder="Search..."
            size="sm"
          />
        </CForm>
        <div className="divider"/>
        <TheHeaderDropdownSetting/>
        <TheHeaderDropdown/>
      </CHeaderNav>
    </CHeader>
  )
}

export default TheHeader
