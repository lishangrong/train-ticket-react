import React, { useCallback, useMemo} from "react";
import { bindActionCreators } from "redux";
import {connect} from 'react-redux'
import Header from "../common/Header.jsx";
import CitySelector from "../common/CitySelector.jsx";
import DateSelector from '../common/DateSelector.jsx'
import Journey from './Journey.jsx'
import DepartDate from "./DepartDate.jsx";
import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  setDepartDate,
  hideDateSelector
} from './action'

import { h0 } from '../common/fp'

function App(props) {
  const {
    from,
    to,
    isCitySelectorVisible,
    cityData,
    isLoadingCityData,
    departDate,
    isDateSelectorVisible,
    dispatch
  } = props
console.log('当前模式是：', import.meta.env.MODE); 
  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  const cbs = useMemo(() => {
    return bindActionCreators(
      { exchangeFromTo, showCitySelector }, 
      dispatch
    )
  }, [])

  const citySelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack: hideCitySelector,
      fetchCityData,
      onSelect: setSelectedCity
    }, dispatch)
  }, [])

  const departDateCbs = useMemo(() => {
    return bindActionCreators({
      onClick: showDateSelector
    }, dispatch)
  }, [])

  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack: hideDateSelector
    }, dispatch)
  }, [])
  const onSelectDate = useCallback((day) =>{
    if (!day) {
      return
    }
    if (day < h0()) {
      return
    }
    dispatch(setDepartDate(day))
    dispatch(hideDateSelector())
  }, [])

  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <form action="./query.html" className="form">
        <Journey from={from} to={to} {...cbs} />
        <DepartDate time={departDate} {...departDateCbs}/>
      </form>
      <CitySelector 
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
      <DateSelector 
        show={isDateSelectorVisible}
        onSelect={onSelectDate}
        {...dateSelectorCbs}
      />
    </div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return state
  },
  function mapDispatchToProps(dispatch){
    return {
      dispatch
    }
  }
)(App)