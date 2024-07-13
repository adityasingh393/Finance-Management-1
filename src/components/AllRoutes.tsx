import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Income from '../pages/Income'
import Expense from '../pages/Expense'
import Budget from '../pages/Budget'

const AllRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/income' element={<Income />} />
            <Route path='/expense' element={<Expense />} />
            <Route path='/budget' element={<Budget />} />
        </Routes>
    </Router>
  )
}

export default AllRoutes