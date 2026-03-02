# Calculator Web App 🧮

A comprehensive, responsive calculator and conversion web application built with **React**. This project provides an all-in-one hub for daily math, financial calculations, health metrics, and unit conversions.

## Features ✨

### Math & Science
- **Basic Calculator:** Standard arithmetic operations with a responsive layout.
- **Scientific Calculator:** Includes trigonometry (`sin`, `cos`, `tan`), logarithms (`log`, `ln`), square root, powers, factorials, and constants (`π`, `e`).
- **Percentage Calculator:** Easily calculate percentages and percentage changes.

### Finance
- **EMI Calculator:** Calculate Equated Monthly Installments for loans.
- **SIP Calculator:** Systematic Investment Plan calculator for mutual funds.
- **GST Calculator:** Calculate Goods and Services Tax (inclusive/exclusive).

### Health & Daily Use
- **BMI Calculator:** Body Mass Index calculator with health category feedback.
- **Calorie Calculator:** Estimate daily calorie needs based on activity level.
- **Age & Discount Calculators:** Quick utilities for everyday calculations.

### Academic
- **GPA & CGPA Calculators:** University average grade tracking.
- **SGPA & CGPA to Percentage:** Convert academic grades to standard percentages.
- **Number System Converter:** Convert between Binary, Decimal, Octal, and Hexadecimal.

### Unit Converters (10 Types)
Fast and seamless unit conversions with smart search (`kg to gm` auto-navigation) and direct URL parameter support for SEO-friendly sharing (e.g. `/converter/weight?from=Kilogram&to=Gram`).
- 📏 Length
- ⚖️ Weight
- 🌡️ Temperature
- 🏎️ Speed
- 🔲 Area
- 💧 Volume
- ⚡ Power
- ⏱️ Time
- 🎈 Pressure
- 💾 Data

## UI / UX Highlights 🎨
- **Smart Search Bar:** Parses natural language queries like `"100 cm to inches"` to instantly open and pre-fill converters.
- **Mobile First Sidebar:** "More Tools" and "Related Tools" automatically collapse into horizontal, swipeable chips on smaller screens to maximize calculator space.
- **Clean Neumorphic/Glassmorphism Design:** Modern, accessible color palette tailored with `global.css`.

## Development Setup 🛠️

1. **Clone the repository**
   ```bash
   git clone https://github.com/pappu-dey/calculator-web-app.git
   cd calculator-web-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will run locally at [http://localhost:3000](http://localhost:3000).

4. **Build for production**
   ```bash
   npm run build
   ```

## Tech Stack 💻
- React 18
- React Router DOM v6
- Context API (for Theme Management)
- CSS3 (Custom Properties & Flexbox/Grid)

## License 📄
This project is open-source and available under the [MIT License](LICENSE).
