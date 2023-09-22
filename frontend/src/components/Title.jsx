
function Title() {
    const titleStyle = {
        fontFamily: 'Pacifico, sans-serif', 
        fontSize: '70px', 
        fontWeight: 'bold', 
        color: '#FFFFFF', 
        marginBottom: '5px'
      };
      const titleStyle2 = {
        fontFamily: 'Pacifico, sans-serif', 
        fontSize: '45px', 
        fontWeight: 'bold', 
        color: '#FFFFFF', 
        marginTop: '0px'
      };
      return <div> <h1 style={titleStyle}>EKREB </h1>
      <h1 style={titleStyle2}> play scrambling puzzles!</h1>  </div>;
}

export default Title;