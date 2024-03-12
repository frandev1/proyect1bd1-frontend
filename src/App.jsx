import React, { useState } from 'react';
import { Grid } from 'gridjs-react';

const url = 'http://localhost:5000/api/empleados';

function App() {
  const [insertarEmpleado, setInsertarEmpleado] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const newEmployeeName = e.target[0].value;
    const newEmployeeSalary = e.target[1].value;
    handleInsertEmpleado(newEmployeeName, newEmployeeSalary);
  };

  const handleInsertEmpleado = async (newEmployeeName, newEmployeeSalary) => {
    // Validación del nombre (no vacío) y no tenga numeros
    const nameVal = /^[a-zA-Z\s]+$/;
    if (!nameVal.test(newEmployeeName)) {
      alert('Nombre inválido');
      return;
    }

    // Validación del precio (números y dos decimales)
    const salaryVal = /^\d+(\.\d{1,2})?$/;
    if (!salaryVal.test(newEmployeeSalary)) {
      alert('Salario inválido');
      return;
    }

    try {
      const response = fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "nombre": newEmployeeName,
          "salario": newEmployeeSalary
        })
      });
      /*const response = axios.post(url, 
        { 
          'nombre': newEmployeeName,
          'salario': newEmployeeSalary
        }, 
        {
        headers: {
          // 'application/json' is the modern content-type for JSON, but some
          // older servers may use 'text/json'.
          // See: http://bit.ly/text-json
          'content-type': 'application/json'
        }
      });*/
      alert(response.result);
      console.log(response);

      if (response.result == false ) {
        alert('Ya existe un empleado con este nombre');

      } else {
        alert('Empleado insertado correctamente');
        setInsertarEmpleado(false); // Cierra insertar
      }
    } catch (error) {
      alert('Error al insertar empleado:', error);
    }
    
  };

  return (
    <div>
      <center>
      <h1>Empleados</h1>
      </center>
      <Grid
        columns={['Id', 'Nombre', 'Salario']}
        search={true}
        pagination={{
          enabled: true,
          limit: 5,
          summary: false,
        }}
        server={{
          method: 'GET',
          url: 'http://localhost:5000/api/empleados',
          then: data => data.empleados.map(e => [e.id, e.Nombre, e.Salario]),
        }}
        language={{
          'search': {
            'placeholder': 'Buscar...'
          },
          'pagination': {
            'previous': 'Anterior',
            'next': 'Siguiente',
            'showing': 'Mostrando',
            'results': () => 'Resultados',
            'of': 'de',
            'to': 'a'
          }
        }}
        style={{
          table: {
            'borderCollapse': 'collapse',
            'border': '1px solid #ddd',
            'width': '100%',
          },
          th: {
            'border': '1px solid #ddd',
            'textAlign': 'left',
          },
          td: {
            'border': '1px solid #ddd',
          }
        }}
      />
      <button onClick={() => window.location.reload()}>Recargar</button>
      <button onClick={() => setInsertarEmpleado(true)}>Insertar</button>
     

    {/*insertarEmpleado*/}
    {insertarEmpleado && (
      <div>
        <h2>Insertar Empleado</h2>
        <form onSubmit={onSubmit}>
          <p>Nombre: 
            <br></br>
          <input 
          type="text"
          id= "nombre"
          />
          </p>
          
          <p>Salario:
            <br></br>
          <input 
          type="text"
          id= "salario"
          />
          </p>
          <br/>
          <button type='submit'>Insertar</button>
          <button onClick={() => setInsertarEmpleado(false)}>Cancelar</button>
        </form>
      </div>
    )}
    </div>
  )
}

export default App
