import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';

export class Civilization extends React.Component {
    constructor(props){ //inherit properties of parent, ideally this should be the Setting component
        super(props); //apply the properties of the parent component
        this.civilization = props.civilization; //assign a unique prop value of civilization to props.civilization (directly passed in when created)
        this.number = Number(props.number)+1; //likewise, a number property, props must be forced to be treated as a number to count correctly according to humans
    }
    startB(){
        let holdMe = Object.keys(this.props.civilization.Biome.Biomes).map(key => //as per above but for Biome sub-object specifically
            <TableRow><TableCell className="ObjVal" key = {key}>
                <p className="Tooltip">{this.props.civilization.Biome.Biomes[key]}
                <span className="Tooltiptext">{this.props.civilization.Biome.BiomesExplanations[key]}</span>
                </p></TableCell></TableRow>
        );
        
        return holdMe;
    }
    startM(e){
        let holdMe = Object.keys(this.props.civilization[e]).map(key => //iterate over the keys of a given type and create a list
            <TableRow><TableCell className="ObjVal" key = {key}><textarea className="FillMe">{this.props.civilization[e][key]}</textarea></TableCell></TableRow> //civilization object -> key -> the value is an array, what value of array we are on
        );

        return holdMe; //return the JSX and render it
    }

    render(){
        return (
            <TableContainer className="ObjectDisplay">
                <Table style={{border:"solid"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell className="ObjectMajor" align="center" colspan={3}>This is civilization: <textarea className="FillMe">{this.number}</textarea>
                                <p className="Tooltip">&nbsp; which ranks #{this.props.civilization.PowerScale} in this setting.
                                    <span className="Tooltiptext">Within this setting, this civilization would be considered #rank in terms of power or desireability to live there.</span>
                                </p>
                            </TableCell>
                        </TableRow>
                    </TableHead>
            {/*Most of this is simply the name of the trait followed by the specific value in the property*/}
                    <TableBody>
                        <TableRow>
                            <TableCell colspan={3} align="center">
                                <p className="Tooltip">Systems of Government
                                        <span className="Tooltiptext">The main features of how this civilization governs itself, raw facts and bureaucratic day-to-day. Know that not everything
                                        may be intentional or "as it seems".</span>
                                    </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="ObjKey">
                                <p className="Tooltip">Type 1: &nbsp;
                                    <span className="Tooltiptext">The first "type" of organizational principle this government has. IE "Republic", or "Capitalist"</span>
                                </p>
                                <p className="Tooltip"> {this.props.civilization.GovtType[0]}
                                    <span className="Tooltiptext">{this.props.civilization.GovtTypeExplanation[0]}</span>
                                </p>
                            </TableCell>
                            <TableCell className="ObjKey">
                                <p className="Tooltip">Type 2: &nbsp;
                                    <span className="Tooltiptext">The second "type" of organizational principle this government has. IE "Republic", or "Matriarchy"</span>
                                </p>
                                <p className="Tooltip"> {this.props.civilization.GovtType[1]}
                                    <span className="Tooltiptext">{this.props.civilization.GovtTypeExplanation[1]}</span>
                                </p>
                            </TableCell>
                            <TableCell className="ObjKey">
                                <p className="Tooltip">Economic Focus: &nbsp;
                                    <span className="Tooltiptext">What does this civilization primarily use to trade with other civilizations?</span>
                                </p>
                                <p className="Tooltip"> {this.props.civilization.EconomicFocus}
                                    <span className="Tooltiptext">{this.props.civilization.EconomicFocusExplanation}</span>
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="ObjKey">
                                <p className="Tooltip">Religious Relations: &nbsp; 
                                    <span className="Tooltiptext">How does this civilization treat Religions?</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.GovtReligiousRelations}
                                    <span className="Tooltiptext">{this.props.civilization.GovtReligiousRelationsExplanation}</span>
                                </p>
                                </TableCell>
                            <TableCell className="ObjKey">
                                <p className="Tooltip">Majorities and Minorities: &nbsp; 
                                    <span className="Tooltiptext">There is often one group of people that can be numerically counted as the "majority" in a civilization. All other groups would be a "minority". How does the government view these groups?</span>
                                </p>
                                <p className = "Tooltip">{this.props.civilization.MajoritiesAndMinorities}
                                    <span className = "Tooltiptext">{this.props.civilization.MajoritiesAndMinoritiesExplanation}</span>
                                </p>
                                </TableCell>
                                {this.startM("MnMList")}
                        </TableRow>
                        <TableRow>
                            <TableCell className="ObjKey">
                                <p className="Tooltip">Transportation Infrastructure: &nbsp;
                                    <span className="Tooltiptext">What is this civ's preferred focus in moving goods and people from place to place?</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.TransportationInfrastructure}
                                    <span className="Tooltiptext">{this.props.civilization.TransportationInfrastructureExplanation}</span>
                                </p>
                            </TableCell>
                            <TableCell className="ObjKey">
                                <p className="Tooltip">Energy Infrastructure: &nbsp;
                                    <span className="Tooltiptext">What is this civ's preffered focus in how people get heat and operate tools?</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.EnergyInfrastructure}
                                    <span className="Tooltiptext">{this.props.civilization.EnergyInfrastructureExplanation}</span>
                                </p>
                            </TableCell>
                            <TableCell className="ObjKey">
                                <p className="Tooltip">Foreign Relations: &nbsp;
                                    <span className="Tooltiptext">How does this government generally interact with other governments?</span> 
                                </p>    
                                <p className="Tooltip">{this.props.civilization.ForeignRelations}
                                    <span className="Tooltiptext">{this.props.civilization.ForeignRelationsExplanation}</span>
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="ObjKey">
                                <p className="Tooltip">Military Specialty: &nbsp;
                                    <span className="Tooltiptext">How this civilization best defends itself in large scale combat.</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.MilitarySpecialty}
                                    <span className="Tooltiptext">{this.props.civilization.MilitarySpecialtyExplanation}</span>
                                </p>
                            </TableCell>
                            <TableCell className="ObjKey">
                                <p className="Tooltip">Frequent Issue: &nbsp;
                                    <span className="Tooltiptext">What is a reccuring problem this civilization has been dealing with?</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.FrequentIssue}
                                    <span className="Tooltiptext">{this.props.civilization.FrequentIssueExplanation}</span>
                                </p>
                                </TableCell>
                            <TableCell className="ObjKey">
                                <p className="Tooltip">Magic/Tech Policy: &nbsp;
                                    <span className="Tooltiptext">What kind of legal policy is implemented for advancing or using Magic/Technology.</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.MagicOrTechRelations}
                                    <span className="Tooltiptext">{this.props.civilization.MagicOrTechRelationsExplanation}</span>
                                </p>
                                </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell colspan={3} align="center">
                                <p className="Tooltip">Area Controlled: &nbsp;
                                    <span className="Tooltiptext">How much space does this civilization actually control?</span> 
                                </p>
                                <p className="Tooltip">{this.props.civilization.AreaControl}
                                    <span className="Tooltiptext">{this.props.civilization.AreaControlExplanation}</span>
                                </p>    
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="ObjKey" colspan={2}>
                                <p className="Tooltip">{this.props.civilization.Biome.PopulationDistribution}
                                    <span className="Tooltiptext">{this.props.civilization.Biome.PopulationDistributionExplanation}</span>
                                </p>
                                </TableCell>
                            {this.startB()}
                        </TableRow>

                        <TableRow>
                            <TableCell colspan={3} align="center">
                                <p className="Tooltip">Culture
                                    <span className="Tooltiptext">The overarching culture shared by all members of this civilization.</span></p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell className="ObjKey">
                               <p className="Tooltip">Population Trait: &nbsp;
                                    <span className="Tooltiptext">A "stereotype" applied to all members of this population. Something the average person here tends to exhibit.</span>
                               </p> 
                               {this.props.civilization.PopulationTrait}
                               </TableCell>
                            <TableCell className="ObjKey">
                                <p className="Tooltip">Gender Relations: &nbsp; 
                                <span className="Tooltiptext">How is social influence weighted amongst genders.</span>
                                </p>
                                <p className="Tooltip">{this.props.civilization.GenderRelations}
                                <span className="Tooltiptext">{this.props.civilization.GenderRelationsExplanation}</span>
                                </p>
                            </TableCell>
                            <TableCell className="ObjKey">
                                <p className="Tooltip">Major Cultural Value: &nbsp;
                                <span className="Tooltiptext">Something that is generally considered desireable or "good" by the people of this civilization.</span>
                                </p>
                                {this.props.civilization.MajorCulturalValue}
                                </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="ObjKey">
                                <p className="Tooltip">Popular Issue: &nbsp;
                                    <span className="Tooltiptext1">Something that the people of this civilization tend to talk about, as a point of belief, concern, controversy, or identity.</span>
                                </p>
                                {this.props.civilization.PopularIssue}</TableCell>
                            <TableCell className="ObjKey">
                                <p className="Tooltip">Major Cultural Issue: &nbsp;
                                    <span className="Tooltiptext1">Something that is causing a rift in culture amongst the people, with them "picking sides".</span>
                                </p>
                                {this.props.civilization.MajorCulturalIssue}
                            </TableCell>
                            <TableCell className="ObjKey">
                                <p className="Tooltip">Major Cultural Taboo: &nbsp;
                                    <span className="Tooltiptext1">Something that is forbidden, discouraged, undesireable, or just not discussed according to the culture of this civilization.</span>
                                </p>
                                {this.props.civilization.MajorCulturalTaboo}</TableCell>
                        </TableRow>
                        <TableRow>
                            
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}