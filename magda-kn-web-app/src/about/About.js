import React from 'react';
import './About.css'
const About = () => (
    <div className="container container-main ">
        <div className="row about">

            <div className="col-md-8 ">
               <h3>Helping communities explore, discover and share data.</h3>
               <p>  
                  In order innovate and gain data driven insights,  people need the best available
                  information. However, up-to-date information is not easily found. 
                  Data providers and data users are seeking improved ways to:
               </p>
               <ul>
                 <li>discover data</li>
                 <li>trust data</li>
                 <li>receive recognition for data and understand resulting outcomes and impacts</li>
                 <li>understand how others use their data</li>
                 <li>understand the network of data users</li>
                 <li>join a community</li>
               </ul>

               <h4>Connecting people to data and experts</h4>
               <p>
                  Knowledge Network is an online platform that connects people to data and experts. 
                  It is a window to datasets held elsewhere, rather than a data repository.
               </p>
               <p>We aim to help: 
                  </p><ul>
                     <li>Data users find high-quality information and experts simply and quickly, 
                         and see connections to people, projects and publications.
                     </li>
                     <li>
                        Data providers make their data findable, and see how the community uses  and endorses their data
                     </li>
                     <li>The community meets to discover, innovate and trust</li>
                  </ul>

                  This site is in development and intended for demonstration purposes only.
			    <p>
                  This work is a collaboration between CSIRO Land and Water Environmental Informatics group and Data61 Engineering and Developmenet group.
				  The current release of Knowledge Network (version 2.0.0-alpha) is based on code developed by the 
				  Platforms for Open Data (PfOD) initiative in Data61 - see the github site here: <a href="https://github.com/TerriaJS/magda">https://github.com/TerriaJS/magda</a>.
				  MAGDA is also the platform powering the next generation of data.gov.au - check it out here: <a href="https://github.com/TerriaJS/magda">http://search.data.gov.au/</a>.
				  <br/>
				  <img src="/img/data61_csiro_logo.jpg" alt="data61_csiro_logo"/>
				</p>
				<p>				
                  We would value your feedback and comments - <a href="https://research.csiro.au/oznome/contact/">contact us here</a>.
               </p>
               <h4>Data sources and attribution</h4>
               <p>
                  Metadata records have been sourced from Open Data catalogs. These are:
                  </p><ul>
                     <li>data.gov.au licenced under Creative Commons Attribution 3.0 Australia licence</li>
                     <li>data.vic.gov.au licenced under Creative Commons Attribution Version 4.0 (international licence) </li>
                     <li>data.melbourne.gov.au licenced under Creative Commons Attribution 3.0 Australia</li>
                     <li>data.nsw.gov.au licenced under Creative Commons Attribution 4.0 International (CC BY 4.0) </li>
                     <li>data.qld.gov.au licenced under Creative Commons Attribution 3.0 Australia (CC BY) licence</li>
                     <li>data.sa.gov.au licenced under Creative Commons Attribution 4.0 International (CC BY 4.0) </li>
                     <li>data.wa.gov.au licenced under Creative Commons Attribution 4.0 International (CC BY 4.0) </li>
                     <li>data.act.gov.au licenced under ACT Open Government policy</li>
                     <li>data.aurin.org.au</li>
                  </ul>
               <p></p>

            </div>

        </div>
    </div>
  )
export default About