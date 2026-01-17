
import { Component } from "react";

export default class App extends Component {
  state = { 
    basicPay: "",
    da: 0,
    hra: 0,
    specialAllowance: 0,
    totalSalary: 0,
    grade: "",
    bonus: 0,
    showGrade: false,
    showBonus: false
  };

  handleBasicPayChange = (e) => {
    const basicPay = e.target.value;
    const basic = Number(basicPay);
    
    // Calculate DA (30% of BasicPay)
    const da = basic * 0.30;
    
    // Calculate HRA (10% of BasicPay)
    const hra = basic * 0.10;
    
    // Calculate Special Allowance (5% of BasicPay)
    const specialAllowance = basic * 0.05;
    
    // Calculate Total Salary
    const totalSalary = basic + da + hra + specialAllowance;
    
    this.setState({
      basicPay,
      da,
      hra,
      specialAllowance,
      totalSalary,
      showGrade: false,
      showBonus: false,
      grade: "",
      bonus: 0
    });
  };

  checkGrade = () => {
    const { totalSalary } = this.state;
    let grade = "";
    
    if (totalSalary >= 10000 && totalSalary <= 20000) {
      grade = "A";
    } else if (totalSalary >= 20001 && totalSalary <= 30000) {
      grade = "B";
    } else if (totalSalary >= 30001 && totalSalary <= 40000) {
      grade = "C";
    } else if (totalSalary > 40000) {
      grade = "EXC";
    }
    
    this.setState({ grade, showGrade: true, showBonus: false, bonus: 0 });
  };

  checkBonus = () => {
    const { grade, basicPay } = this.state;
    const basic = Number(basicPay);
    let bonus = 0;
    
    if (grade === "A") {
      bonus = basic * 0.15; // 15% of BasicPay
    } else if (grade === "B") {
      bonus = basic * 0.12; // 12% of BasicPay
    } else if (grade === "C") {
      bonus = basic * 0.06; // 6% of BasicPay
    } else if (grade === "EXC") {
      bonus = basic * 0.05; // 5% of BasicPay
    }
    
    this.setState({ bonus, showBonus: true });
  };

  render() {
    const { basicPay, da, hra, specialAllowance, totalSalary, grade, bonus, showGrade, showBonus } = this.state;
    
    return (
      <div className="container">
        <div className="header">
          <div className="icon-wrapper"></div>
          <h1>Employee Tax Calculator</h1>
          <p>Calculate salary breakdown, grade, and bonus instantly</p>
        </div>

        <div className="card input-section">
          <div className="card-title">Salary Input</div>
          <div className="input-wrapper">
            <label className="input-label">Basic Pay (₹)</label>
            <input 
              type="number"
              placeholder="Enter basic pay"
              value={basicPay}
              onChange={this.handleBasicPayChange} 
            />
          </div>
          
          {basicPay && (
            <div className="salary-breakdown">
              <div className="breakdown-item da">
                <span className="breakdown-label">DA (30%)</span>
                <span className="breakdown-value">₹{da.toFixed(2)}</span>
              </div>
              <div className="breakdown-item hra">
                <span className="breakdown-label">HRA (10%)</span>
                <span className="breakdown-value">₹{hra.toFixed(2)}</span>
              </div>
              <div className="breakdown-item special">
                <span className="breakdown-label">Special Allowance (5%)</span>
                <span className="breakdown-value">₹{specialAllowance.toFixed(2)}</span>
              </div>
              <div className="breakdown-item total">
                <span className="breakdown-label">Total Salary</span>
                <span className="breakdown-value">₹{totalSalary.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="card grade-section">
          <div className="card-title">Grade Analysis</div>
          <button 
            className="btn btn-grade" 
            onClick={this.checkGrade}
            disabled={!basicPay}
          >
            Check Grade
          </button>
          
          {showGrade && grade && (
            <div className="grade-display">
              <div className="grade-badge">Grade {grade}</div>
              <div className="grade-info">
                {grade === "A" && "Salary Range: ₹10,000 - ₹20,000"}
                {grade === "B" && "Salary Range: ₹20,001 - ₹30,000"}
                {grade === "C" && "Salary Range: ₹30,001 - ₹40,000"}
                {grade === "EXC" && "Salary Range: Above ₹40,000"}
              </div>
            </div>
          )}
          
          {showGrade && !grade && (
            <div className="empty-message">Please enter a valid salary to check grade</div>
          )}
        </div>

        <div className="card bonus-section">
          <div className="card-title">Bonus Calculation</div>
          <button 
            className="btn btn-bonus" 
            onClick={this.checkBonus}
            disabled={!grade}
          >
            Check Bonus
          </button>
          
          {showBonus && bonus > 0 && (
            <div className="bonus-display">
              <div className="bonus-amount">₹{bonus.toFixed(2)}</div>
              <div className="bonus-info">
                {grade === "A" && "15% Bonus"}
                {grade === "B" && "12% Bonus"}
                {grade === "C" && "6% Bonus"}
                {grade === "EXC" && "5% Bonus"}
              </div>
            </div>
          )}
          
          {!grade && (
            <div className="empty-message">Click "Check Grade" button first to calculate bonus</div>
          )}
        </div>

        <div className="grade-info-footer">
          <div className="info-grid">
            <div className="info-item">
              <div className="info-badge grade-a">Grade A</div>
              <div className="info-text">15% Bonus</div>
            </div>
            <div className="info-item">
              <div className="info-badge grade-b">Grade B</div>
              <div className="info-text">12% Bonus</div>
            </div>
            <div className="info-item">
              <div className="info-badge grade-c">Grade C</div>
              <div className="info-text">6% Bonus</div>
            </div>
            <div className="info-item">
              <div className="info-badge grade-exc">Grade EXC</div>
              <div className="info-text">5% Bonus</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
