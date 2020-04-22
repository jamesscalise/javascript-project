const clickedCheck = {}

const javascriptFunction = function() {
  console.log('test');
}


document.addEventListener("DOMContentLoaded", () => {

    let destinationContainer = document.getElementById('destination-collection')
    let destinationForm = document.getElementById('new-container')

    class Destination{
        constructor(destination){
            this.id = destination.id
            this.name = destination.attributes.name
        }

        static newDestination(destination_data){
            fetch('http://localhost:3000/destinations', {
            method: 'POST',
            headers:{
            'Content-Type': 'application/json',
            'Accept': "application/json"
            },
            body: JSON.stringify({
            "name": destination_data.name.value
            })
             })
            .then(res => res.json())
            .then((obj_destination) => {
            let newDestination = new Destination(obj_destination.data)
            newDestination.displayDestination()
            console.log(obj_destination)
         })
        }


       compress(){
        const bin = document.getElementsByClassName('site-card')[this.id - 1]
        bin.innerHTML = ''
      }

        displayDestination(){
            const div = document.createElement('div');
            div.setAttribute('class', 'destination-card')
    
            
    
            const h1= document.createElement('h1');
            h1.innerHTML = this.name;
            h1.setAttribute('id', this.id)
            div.append(h1);
    
            const siteDiv = document.createElement('div')
            siteDiv.setAttribute('class', 'site-card')
            div.appendChild(siteDiv)
    
            destinationContainer.appendChild(div);
            clickedCheck[this.id] = false
            h1.addEventListener('click', (e) => {
                if (!clickedCheck[e.target.id]){
                    console.log(e.target.id)
                    clickedCheck[e.target.id] = !clickedCheck[e.target.id]
                    Site.displaySites(e)
                }else{
                    console.log(e.target.id)
                    clickedCheck[e.target.id] = !clickedCheck[e.target.id]
                    this.compress()
                }
              })

        }



        static getDestinations(){
            return fetch('http://localhost:3000/destinations')
             .then(res => res.json())
        }
    }

    class Site{
        constructor(site){
            this.id = site.id
            this.name = site.name
            this.destination_id = site.destination_id
        }  
        
        static newSite(site_data){
          fetch('http://localhost:3000/sites', {
            method: 'POST',
            headers:{
            'Content-Type': 'application/json',
            'Accept': "application/json"
            },
            body: JSON.stringify({
              "name": destination_data.name.value
           //  "destination_id": destination_data.destination_id.value
            })
             })
            .then(res => res.json())
            .then((obj_site) => {
            let newSite = new Site(obj_site.data)
            newSite.displaySite()
            console.log(obj_site)
         })
        }

        displaySite(){
            let site_container = document.getElementsByClassName('site-container')[this.destination_id - 1]
            console.log(this.destination_id)
            
            const list = document.createElement('li')
                          
            list.innerText = this.name;

            site_container.appendChild(list)
        }

        static displaySites(e){
            
          let destination = document.getElementsByClassName('site-card')[e.target.id - 1]
          const div = document.createElement('div')
          div.setAttribute('class', 'site-container')
          destination.appendChild(div)
              fetch(`http://localhost:3000/destinations/${e.target.id}`)
                .then(res => res.json())
                .then(json =>{
                        json.data.attributes.sites.forEach(site => {
                        
                            let newSite = new Site(site)
                            newSite.displaySite()

                         
                        })
      
                        
                 })
                   
                  let form =
                  `
                      <div id="new-site-container">
                          <form id = 'new-site-form'>
                          <p>Add a sight for this destination</p>
              
                          <input type="text" name="name" value="" placeholder="Enter the sight name" class="input-text">
                          <br>
                          
                          <input type="submit" name="submit" value="Add a new sight" class="submit" onclick="javascriptFunction();">
                          </form>
                        </div>
                      `
                      destination.insertAdjacentHTML('beforeend', form)   
                
                 

        }

        static getSites(){

        }
    }


    destinationForm.addEventListener('submit', event => {
     event.preventDefault()
     console.log(event)
      Destination.newDestination(event.target)
    })

   

    
    Destination.getDestinations().then(json => {
        json.data.forEach(destination => {
            let newDes = new Destination(destination)
            newDes.displayDestination()
        })
      })
      
      
  
})
