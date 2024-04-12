import logo from './logo.svg';
import './App.css';

const data = [
  { ingredient: "Chicken Breast", amount: "2", calorie: 100 },
  { ingredient: "Lettuce", amount: "1 tbsp", calorie: 50 },
  { ingredient: "Flour", amount: "2 cups", calorie: 10 },
]
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p><strong>
        GASTRONOMIC GAUGE
        </strong>
        </p>
<input type="text" className="textbox" placeholder="Enter recipe link here"></input>
              
              <table>
                <tr>
                    <th>Ingredient</th>
                    <th>Amount</th>
                    <th>Calories</th>
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.ingredient}</td>
                            <td>{val.amount}</td>
                            <td>{val.calorie}</td>
                        </tr>
                    )
                })}
              </table>
       
       <button type="button" className = "buttonBlue">Calculate</button>
       
      </header>
    </div>
  );
}
document.querySelector("button").addEventListener("click", function() {
  document.querySelector("table").style.display = "block";
});

export default App;

