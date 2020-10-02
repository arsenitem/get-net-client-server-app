import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Row, Table } from 'react-bootstrap';

function Bills() {
    let [lines, setLines] = useState([]);
    let [totalPages, setTotalPages] = useState(0);
    let [currentPage, setCurrentPage] = useState(1);
    useEffect(() =>{
      axios.get(`http://localhost:80/api/bills?page=${currentPage}`, {headers:{ Authorization: `Bearer ${localStorage.getItem('token')}`}}).then(response => {
        setTotalPages(Math.ceil(response.data.count/10));
        setLines(response.data.bills);
      });
    }, []);
    let pageClick = (item) => {
      setCurrentPage(item);
      axios.get(`http://localhost:80/api/bills?page=${item}`, {headers:{ Authorization: `Bearer ${localStorage.getItem('token')}`}}).then(response => {
          setLines(response.data.bills);
      });
    }
    let pages = []
    for(let i=1; i<=totalPages;i++) {
        pages.push(i);
    }
  return (
    
    <div className="Lines">
        <Row className="justify-content-center">
        <div className="pagination">
            {pages.map(item => {
                return <span onClick={() => pageClick(item)} className={currentPage === item && "active-page"}>{item}</span>
            })}
            </div>
        </Row>
        
        <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Номер счета</th>
      <th>Сумма</th>
      <th>Статуc</th>
    </tr>
  </thead>
  <tbody>
      {lines.map(item => {
          return <tr>
          <td>{item.number}</td>
          <td>{item.sum}</td>
          <td>{item.status}</td>
        </tr>
      })}
    
  
  </tbody>
</Table>
    </div>
  );
}

export default Bills;