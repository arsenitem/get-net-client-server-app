import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Row, Table } from 'react-bootstrap';

function Bills() {
    let [lines, setLines] = useState([]);
    let [totalPages, setTotalPages] = useState(0);
    let [currentPage, setCurrentPage] = useState(1);
    useEffect(() =>{
        axios.get(`http://localhost:55759/api/tables/linescount`).then(response => {
            setTotalPages(Math.ceil(response.data/10));
        });
        axios.get(`http://localhost:55759/api/tables/lines?page=${currentPage}`).then(response => {
            setLines(response.data);
        })
    }, []);
    let pageClick = (item) => {
        setCurrentPage(item);
        axios.get(`http://localhost:55759/api/tables/lines?page=${item}`).then(response => {
            setLines(response.data);
        })
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
      <th>Тип линии</th>
      <th>CLI</th>
      <th>Город</th>
      <th>Тариф</th>
      <th>Запись звонка</th>
    </tr>
  </thead>
  <tbody>
      {lines.map(item => {
          return <tr>
          <td>{item.type}</td>
          <td>{item.CLI}</td>
          <td>{item.city}</td>
          <td>{item.tariff}</td>
          <td>{item.record? "✔": "✖"}</td>
        </tr>
      })}
    
  
  </tbody>
</Table>
    </div>
  );
}

export default Bills;