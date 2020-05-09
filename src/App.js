import React from 'react';
import M from 'materialize-css';
import { database } from './firebase'
import source from './warning.mp3'
import './App.css';


// #01ce84 Green
// #feb800 Yellow
// #ff494e Red

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      heading: 'LOADING...', 
      backgroundColor:  'dimgrey',
      s1_Speed : 0, 
      station1_Color: '#2196f3',
      s2_Speed : 0,
      station2_Color: '#2196f3',
      s3_Speed : 0,
      station3_Color: '#2196f3',
      Current_Speed : 0,
      Expected_speed : 0,

    }
  }
  componentWillMount() {
    console.log("Will Mount is now running! ")
    
    database.ref('/').on("value", function(dataSnapshot) {
      let Data = dataSnapshot.val();
      // console.log(Data);
      if(!Data) return;
      let s1_Speed = Data.Station1_speed;
      let s2_Speed = Data.Station2_speed;
      let s3_Speed = Data.Station3_speed;
      
      let Expected_speed = Data.Queue_longer / Data.Max_time_in_queue;
      
      
      let station1_Color = s1_Speed >= Expected_speed / 3 ? "#01ce84" : (Expected_speed - 3) /3 <= s1_Speed && s1_Speed < Expected_speed / 3 ? '#feb800' : "#ff494e";
      let station2_Color = s2_Speed >= Expected_speed / 3 ? "#01ce84" : (Expected_speed - 3) /3 <= s2_Speed && s2_Speed < Expected_speed / 3 ? '#feb800' : "#ff494e";
      let station3_Color = s3_Speed >= Expected_speed / 3 ? "#01ce84" : (Expected_speed - 3) /3 <= s3_Speed && s3_Speed < Expected_speed / 3 ? '#feb800' : "#ff494e";
      // console.log("Seperated colors: ",station1_Color, station2_Color, station3_Color);
      let Current_Speed = Data.current_speed;
      let backgroundColor = Current_Speed >= Expected_speed ? "#01ce84" : Expected_speed - 3 <= Current_Speed && Current_Speed < Expected_speed ? '#feb800' : "#ff494e";
      let heading = backgroundColor === '#01ce84' ? "NORMAL" : backgroundColor === '#feb800' ? "WARNING" : "CRITICAL";
      let audioFun;
      console.log(heading);
      if(heading === 'CRITICAL'){
        console.log("Now The Audio Should be played");
        audioFun = setInterval(() => {
          document.getElementById('playAudio').play();
          console.log("AudiFun",audioFun, " - heading", this.state.heading);

          if(this.state.heading !== 'CRITICAL') {
            document.getElementById('playAudio').pause();
            clearInterval(audioFun);
            console.log("clearing Intervel", audioFun);
          }
        },5 * 1000);
      }

        this.setState({s1_Speed, station1_Color, s2_Speed, station2_Color, s3_Speed, station3_Color, Current_Speed, heading, backgroundColor, Expected_speed });
      }.bind(this));
    }
    componentDidMount(){
      M.AutoInit();
    }
    render(){
      return (
      <div className="App" style={{background: this.state.backgroundColor, height: "100%", paddingBottom: window.innerHeight}}>
        
        <div className='container-fluid' >
          <div className='row' style={{margin: 0,paddingTop: 30}}>

            <div className="" style={{marginTop: 0, background: 'transparent'}}>
              
              {/* HEADING */}
              <h2 style={{ fontWeight: 'bolder', color: 'white', padding: 20, marginTop: 0}}> {this.state.heading} </h2>
              
              
              {/* TOP TOTAL DETAILS */}
              <div className="card-content" style={{paddingBottom: 0}}>
              <div className="row" style={{margin: 0}}>
                <div className="col offset-l2 l4 offset-m1 m5 s12" id='currentCard'>
                  <div className="card-panel" style={{color: this.state.backgroundColor, background: 'white', borderRadius: 5}}>
                    <span ><div className='flow-text' style={{fontSize: 25, fontWeight: 'bold'}}> Current Speed</div>
                    <span style={{fontSize: 100, fontWeight: 'bold'}}>{this.state.Current_Speed}</span> <i className='material-icons'>directions_walk</i>/min
                    </span>

                    <audio style={{display: 'none'}} id="playAudio"><source src={source} type="audio/mp3" /> </audio>
                  </div>
                </div>
                <div className="col l4 m5 s12">
                  <div className="card-panel" style={{color: this.state.backgroundColor, background: 'white', borderRadius: 5}}>
                    <span ><div className='flow-text' style={{fontSize: 25, fontWeight: 'bold'}}> Expected Speed</div>
                    <span style={{fontSize: 100, fontWeight: 'bold'}}>{Math.round(this.state.Expected_speed)}</span> <i className='material-icons'>directions_walk</i>/min
                    </span>``
                  </div>
                </div>
              </div>
              </div>

              {/* Bottom Station Details */}
              <div className="card-content" style={{position: "absolute", bottom: 0,width: "100%", height:"40%", marginLeft: "0%", marginRight: "0%", paddingTop:40, paddingBottom: 40 , background:"rgba(74,74,74,0.3"}}>
                <div className="row" style={{ opacity: 1.7, height: "100%", marginBottom: 0}}>
                <div className="col l4 m4 s12" style={{height: "100%", marginBottom: 0}} >
                  <div className="card-panel station" style={{background : this.state.station1_Color, padding: 0, paddingBottom: 10, borderRadius: "5px", height: "100%",fontWeight: 'bold'}}>
                    <span className="white-text"><div style={styleBox.stationHeading}> STATION 1</div>
                    <span style={styleBox.stationText}>{this.state.s1_Speed}</span> <i className='material-icons'>directions_walk</i>/min
                    </span>
                  </div>
                </div>

                <div className="col l4 m4 s12" style={{height: "100%", marginBottom: 0}}>
                  <div className="card-panel station" style={{background : this.state.station2_Color, padding: 0, paddingBottom: 10, borderRadius: "5px", height: "100%", fontWeight: 'bold'}}>
                    <span className="white-text"><div style={styleBox.stationHeading}> STATION 2</div>
                    <span style={styleBox.stationText}>{this.state.s2_Speed}</span> <i className='material-icons'>directions_walk</i>/min
                    </span>
                  </div>
                </div>
                <div className="col l4 m4 s12" style={{height: "100%", marginBottom: 0}}>
                  <div className="card-panel station" style={{background : this.state.station3_Color, padding: 0, paddingBottom: 20 , borderRadius: "5px", height: "100%", fontWeight: 'bold'}}>
                    <span className="white-text"><div style={styleBox.stationHeading}> STATION 3</div>
                    <span style={styleBox.stationText}>{this.state.s3_Speed}</span> <i className='material-icons'>directions_walk</i>/min
                    </span>
                  </div>
                </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
}


const styleBox = {
  stationHeading:{
    fontSize: 25, 
    background: 'white', 
    color: 'dimgrey', 
    borderRadius: "5px 5px 0px 0px",
    fontWeight: 'bold'
  },
  stationText: {
    fontSize: 120
  }
}
export default App;