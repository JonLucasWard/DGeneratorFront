import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';

export class Civilization extends React.Component {
    constructor(props){ //inherit properties of parent, ideally this should be the Setting component
        super(props); //apply the properties of the parent component
        this.civilization = props.civilization; //assign a unique prop value of civilization to props.civilization (directly passed in when created)
        this.number = Number(props.number)+1; //likewise, a number property, props must be forced to be treated as a number to count correctly according to humans
    }
    startB(){ //create a list of biomes
        let holdMe = Object.keys(this.props.civilization.Biome.Biomes).map(key => //take civilization props, mapping the list of Biomes
            <TableRow className="SubThirdsRow"><TableCell align="center" className="SubThirdsCell" key = {key}> {/*create a list of rows and cells with biomes*/}
                <p className="Tooltip">{this.props.civilization.Biome.Biomes[key]} {/*Tool tip, the user sees the name of biome */}
                <span className="Tooltiptext">{this.props.civilization.Biome.BiomesExplanations[key]}</span> {/*explanation text that "covers" the length of the biome name previously, appears if hovered over*/}
                </p></TableCell></TableRow>
        );
        
        return holdMe; //return the JSX object and add it to HTML page
    }
    startM(e){ //same as above, but it's for Minority groups IF they get generated
        let holdMe = Object.keys(this.props.civilization[e]).map(key => //iterate over the keys of a given type and create a list
            <TableRow className="SubThirdsRow"><TableCell align="center" className="SubThirdsCell" key = {key}><textarea className="FillMe" style={{display:"block", "margin-left":"auto", "margin-right":"auto"}}>{this.props.civilization[e][key]}</textarea></TableCell></TableRow> //civilization object -> key -> the value is an array, what value of array we are on
        );

        return holdMe; //return the JSX and render it
    }

    render(){
        return (
            <TableContainer className="ObjectDisplay"> {/*Create a container to hold this whole table thing, class gives some basic values for CSS*/}
                <Table style={{border:"solid"}}> {/*The actual table, we give it a solid border so it's clear*/}
                    <TableHead>
                        <TableRow>
                            {/*A "header" row, we'll have a few of these that set up for sections in the object for easier organization, colspan {3} means that it crosses 3 columns*/}
                            <TableCell className="ThirdsCell" align="center" colspan={3}><p className="Tooltip">This is civilization: </p><textarea className="FillMe">{this.number}</textarea>
                                <p className="Tooltip">&nbsp; which ranks #{this.props.civilization.PowerScale} in this setting. {/*above we want a text area for users to put their own Civ names into*/}
                                    <span className="Tooltiptext">Within this setting, this civilization would be considered #rank in terms of power or desireability to live there.</span>
                                </p>
                            </TableCell>
                        </TableRow>
                    </TableHead>
            {/*Most of this is simply the name of the trait followed by the specific value in the property*/}
                    <TableBody>
                        <TableRow>
                            <TableCell colspan={3} align="center">
                                <p id="SectionCell" className="Tooltip">Systems of Government
                                        <span className="Tooltiptext">The main features of how this civilization governs itself, raw facts and bureaucratic day-to-day. Know that not everything
                                        may be intentional or "as it seems".</span>
                                    </p>
                            </TableCell>
                        </TableRow>
                        <TableRow> {/*Now we have rows of various results, with the name of what the cell is supposed to be, explaining the purpose of the cell, and "answer", and more details of the answer if available*/}
                            <TableCell align="center" className="ThirdsCell">
                                <p className="Tooltip">Type 1:&nbsp;
                                    <span className="Tooltiptext">The first "type" of organizational principle this government has. IE "Republic", or "Capitalist"</span>
                                </p>
                                <p className="Tooltip"> {this.props.civilization.GovtType[0]}
                                    <span className="Tooltiptext">{this.props.civilization.GovtTypeExplanation[0]}</span>
                                </p>
                            </TableCell>
                            <TableCell align="center" className="ThirdsCell">
                                <p className="Tooltip">Type 2:&nbsp;
                                    <span className="Tooltiptext">The second "type" of organizational principle this government has. IE "Republic", or "Matriarchy"</span>
                                </p>
                                <p className="Tooltip"> {this.props.civilization.GovtType[1]}
                                    <span className="Tooltiptext">{this.props.civilization.GovtTypeExplanation[1]}</span>
                                </p>
                            </TableCell>
                            <TableCell align="center" className="ThirdsCell">
                                <p className="Tooltip">Economic Focus:&nbsp;
                                    <span className="Tooltiptext">What does this civilization primarily use to trade with other civilizations?</span>
                                </p>
                                <p className="Tooltip"> {this.props.civilization.EconomicFocus}
                                    <span className="Tooltiptext2">{this.props.civilization.EconomicFocusExplanation}</span>
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" className="ThirdsCell">
                                <p className="Tooltip">Religious Relations:&nbsp; 
                                    <span className="Tooltiptext">How does this civilization treat Religions?</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.GovtReligiousRelations}
                                    <span className="Tooltiptext">{this.props.civilization.GovtReligiousRelationsExplanation}</span>
                                </p>
                                </TableCell>
                            <TableCell align="center" className="ThirdsCell">
                                <p className="Tooltip">Majorities and Minorities:&nbsp; 
                                    <span className="Tooltiptext">There is often one group of people that can be numerically counted as the "majority" in a civilization. All other groups would be a "minority". How does the government view these groups?</span>
                                </p>
                                <p className = "Tooltip">{this.props.civilization.MajoritiesAndMinorities}
                                    <span className = "Tooltiptext">{this.props.civilization.MajoritiesAndMinoritiesExplanation}</span>
                                </p>
                                </TableCell>
                                {this.startM("MnMList")} {/*Function is called to create "rows within rows", a series of rows where a cell would be*/}
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" className="ThirdsCell">
                                <p className="Tooltip">Transportation Infrastructure:&nbsp;
                                    <span className="Tooltiptext">What is this civ's preferred focus in moving goods and people from place to place?</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.TransportationInfrastructure}
                                    <span className="Tooltiptext">{this.props.civilization.TransportationInfrastructureExplanation}</span>
                                </p>
                            </TableCell>
                            <TableCell align="center" className="ThirdsCell">
                                <p className="Tooltip">Energy Infrastructure:&nbsp;
                                    <span className="Tooltiptext">What is this civ's preffered focus in how people get heat and operate tools?</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.EnergyInfrastructure}
                                    <span className="Tooltiptext">{this.props.civilization.EnergyInfrastructureExplanation}</span>
                                </p>
                            </TableCell>
                            <TableCell align="center" className="ThirdsCell">
                                <p className="Tooltip">Foreign Relations:&nbsp;
                                    <span className="Tooltiptext">How does this government generally interact with other governments?</span> 
                                </p>    
                                <p className="Tooltip">{this.props.civilization.ForeignRelations}
                                    <span className="Tooltiptext2">{this.props.civilization.ForeignRelationsExplanation}</span>
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" className="ThirdsCell">
                                <p className="Tooltip">Military Specialty:&nbsp;
                                    <span className="Tooltiptext">How this civilization best defends itself in large scale combat.</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.MilitarySpecialty}
                                    <span className="Tooltiptext">{this.props.civilization.MilitarySpecialtyExplanation}</span>
                                </p>
                            </TableCell>
                            <TableCell align="center" className="ThirdsCell">
                                <p className="Tooltip">Frequent Issue:&nbsp;
                                    <span className="Tooltiptext">What is a reccuring problem this civilization has been dealing with?</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.FrequentIssue}
                                    <span className="Tooltiptext">{this.props.civilization.FrequentIssueExplanation}</span>
                                </p>
                                </TableCell>
                            <TableCell align="center" className="ThirdsCell">
                                <p className="Tooltip">Magic/Tech Policy:&nbsp;
                                    <span className="Tooltiptext">What kind of legal policy is implemented for advancing or using Magic/Technology.</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.MagicOrTechRelations}
                                {/*NOTE! We use Tooltiptext 2, the end of a "row" is close to the right, often creating spacing problems. Tooltip2 will create explanation text to the left*/}
                                    <span className="Tooltiptext2">{this.props.civilization.MagicOrTechRelationsExplanation}</span>
                                </p>
                                </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell id="SectionCell" align="center" colspan={3}>
                                <p className="Tooltip">Area Controlled:&nbsp;
                                    <span className="Tooltiptext">How much space does this civilization actually control?</span> 
                                </p>
                                <p className="Tooltip">{this.props.civilization.AreaControl}
                                    <span className="Tooltiptext">{this.props.civilization.AreaControlExplanation}</span>
                                </p>    
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell  align="center" className="ThirdsCell" colspan={2}>
                                <p className="Tooltip">{this.props.civilization.Biome.PopulationDistribution}
                                    <span className="Tooltiptext">{this.props.civilization.Biome.PopulationDistributionExplanation}</span>
                                </p>
                                </TableCell>
                            {this.startB()}
                        </TableRow>

                        <TableRow>
                            <TableCell id="SectionCell" colspan={3} align="center">
                                <p className="Tooltip">Culture
                                    <span className="Tooltiptext">The overarching culture shared by all members of this civilization.</span></p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell align="center" className="ThirdsCell">
                               <p className="Tooltip">Population Trait:&nbsp;
                                    {/*Tooltiptext1 will create a text bubble above, rather than down, preventing a need to scroll within this civilization object*/}
                                    <span className="Tooltiptext1">A "stereotype" applied to all members of this population. Something the average person here tends to exhibit.</span>
                               </p> 
                               <p className="Tooltip">{this.props.civilization.PopulationTrait}</p>
                               </TableCell>
                            <TableCell align="center" className="ThirdsCell">
                                <p className="Tooltip">Gender Relations:&nbsp; 
                                <span className="Tooltiptext1">How is social influence weighted amongst genders.</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.GenderRelations}
                                <span className="Tooltiptext1">{this.props.civilization.GenderRelationsExplanation}</span>
                                </p>
                            </TableCell>
                            <TableCell align="center" className="ThirdsCell">
                                <p className="Tooltip">Major Cultural Value:&nbsp;
                                <span className="Tooltiptext1">Something that is generally considered desireable or "good" by the people of this civilization.</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.MajorCulturalValue}</p>
                                </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell  align="center" className="ThirdsCell">
                                <p className="Tooltip">Popular Issue:&nbsp;
                                    <span className="Tooltiptext1">Something that the people of this civilization tend to talk about, as a point of belief, concern, controversy, or identity.</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.PopularIssue}</p></TableCell>
                            <TableCell align="center" className="ThirdsCell">
                                <p className="Tooltip">Major Cultural Issue:&nbsp;
                                    <span className="Tooltiptext1">Something that is causing a rift in culture amongst the people, with them "picking sides".</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.MajorCulturalIssue}</p>
                            </TableCell>
                            <TableCell align="center" className="ThirdsCell">
                                <p className="Tooltip">Major Cultural Taboo:&nbsp;
                                    <span className="Tooltiptext1">Something that is forbidden, discouraged, undesireable, or just not discussed according to the culture of this civilization.</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.MajorCulturalTaboo}</p></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colspan={3}><textarea style={{width: "100%", height: "2rem"}}>Extra Notes</textarea></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}