import Notes from "./Notes"



function HomePage(props) {
  const {showAlert} = props;
  return (
    <div>
      <Notes showAlert={showAlert}/>
    </div>
  )
}

export default HomePage

