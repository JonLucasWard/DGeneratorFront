import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';

export class Religion extends React.Component {
    constructor(props){ //inherit properties of parent, ideally this should be the Setting component
        super(props); //apply the properties of the parent component
        this.religion = props.religion; //assign a unique prop value of civilization to props.civilization (directly passed in when created)
        this.number = Number(props.number)+1; //likewise, a number property, props must be forced to be treated as a number to count correctly according to humans
    }

    loadList(y){ //create a list of biomes
        let holdMe = Object.keys(this.props.religion[y]).map(key => //take civilization props, mapping the list of Biomes
            <TableRow className="SubThirdsRow"><TableCell align="center" className="SubThirdsCell" key = {key}> {/*create a list of rows and cells with biomes*/}
                <p>{this.props.religion[y][key]}</p></TableCell>
            </TableRow>
        );
        return holdMe; //return the JSX object and add it to HTML page
    }

    render(){
        return (
        <TableContainer className="ObjectDisplay"> {/*Create a container to hold this whole table thing, class gives some basic values for CSS*/}
            <Table style={{border:"solid"}}> {/*The actual table, we give it a solid border so it's clear*/}
                <TableHead>
                    <TableRow>
                        {/*A "header" row, we'll have a few of these that set up for sections in the object for easier organization, colspan {3} means that it crosses 3 columns*/}
                        <TableCell className="ThirdsCell" align="center" colspan={3}>
                            <p className="Tooltip">This is religion: </p> <textarea className="FillMe">{this.number}</textarea>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell id="SectionCell" className="ThirdsCell" align="center" colspan={3}>
                            <p id="SectionCell" className="Tooltip">Spiritual Beliefs <span className="Tooltiptext">What it is this religion claims to be truth, or otherwise an acceptable way of life.</span></p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Core Belief is:&nbsp;
                                <span className='Tooltiptext'>A core "fact" from which all other truths spring from. Typically this is a statement about "God" or the existence of the supernatural.</span>
                            </p>    
                            <p className='Tooltip'>{this.props.religion.Belief}
                                <span className='Tooltiptext'>{this.props.religion.BeliefExplanation}</span>
                            </p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>The Divine is:&nbsp;
                                <span className='Tooltiptext'>A particular trait that is crucial to this religion's understanding of the divine or supernatural. There may be a divinity, but what gives it character?</span>
                            </p>    
                            <p className='Tooltip'>{this.props.religion.DivineIs}
                                <span className='Tooltiptext'>{this.props.religion.DivineIsExplanation}</span>
                            </p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>The Cosmos is:&nbsp;
                                <span className='Tooltiptext'>What is the layout of the "universe" as it were? Heaven and Hell? Only physical reality? Infinite Worlds? Or something else?</span>
                            </p>    
                            <p className='Tooltip'>{this.props.religion.Cosmology}
                                <span className='Tooltiptext2'>{this.props.religion.CosmologyExplanation}</span>
                            </p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Existence is:&nbsp;
                                <span className='Tooltiptext'>Either what this religion believes to be the "purpose" of our existence, or a fundamental trait that existence gives.</span>
                            </p>    
                            <p className='Tooltip'>{this.props.religion.ExistenceIs}
                                <span className='Tooltiptext'>{this.props.religion.ExistenceIsExplanation}</span>
                            </p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>The After-Life is:&nbsp;
                                <span className='Tooltiptext'>What this religion believes happens to you after death.</span>
                            </p>    
                            <p className='Tooltip'>{this.props.religion.TheAfterlifeIs}
                                <span className='Tooltiptext'>{this.props.religion.TheAfterlifeIsExplanation}</span>
                            </p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Nature is:&nbsp;
                                <span className='Tooltiptext'>What is the role of the "natural world" or a trait is possesses? Nature can be as broad as non-supernatural or non-foreign reality, or it can be more narrow as things which are not sapient like humans are, animals and natural phenomena.</span>
                            </p>    
                            <p className='Tooltip'>{this.props.religion.NatureIs}
                                <span className='Tooltiptext2'>{this.props.religion.NatureIsExplanation}</span>
                            </p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Evil is:&nbsp;
                                <span className='Tooltiptext'>This religion's base explanation or definition of "evil", things considered undesireable.</span>
                            </p>    
                            <p className='Tooltip'>{this.props.religion.EvilIs}
                                <span className='Tooltiptext'>{this.props.religion.EvilIsExplanation}</span>
                            </p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>People Are:&nbsp;
                                <span className='Tooltiptext'>A fundamental trait of sapient life which this religion holds to be true.</span>
                            </p>    
                            <p className='Tooltip'>{this.props.religion.PeopleAre}
                                <span className='Tooltiptext'>{this.props.religion.PeopleAreExplanation}</span>
                            </p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>To be "saved" you:&nbsp;
                                <span className='Tooltiptext'>What this religion expects people to do if they want to have a "good ending" to their lives.</span>
                            </p>    
                            <p className='Tooltip'>{this.props.religion.ToBeSavedYou}
                                <span className='Tooltiptext2'>{this.props.religion.ToBeSavedYouExplanation}</span>
                            </p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Relationship with Other Religions:&nbsp;
                                <span className='Tooltiptext'>Spiritually speaking, how does this religion, view other competing ideologies?</span>
                            </p>    
                            <p className='Tooltip'>{this.props.religion.RelationshipWithOtherReligions}
                                <span className='Tooltiptext'>{this.props.religion.RelationshipWithOtherReligionsExplanation}</span>
                            </p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>The study of the Divine is:&nbsp;
                                <span className='Tooltiptext'>How does this religion try to expand or grow its knowledge of the spiritual or divine? If it bothers at all.</span>
                            </p>    
                            <p className='Tooltip'>{this.props.religion.StudyOfDivine}
                                <span className='Tooltiptext'>{this.props.religion.StudyOfDivineExplanation}</span>
                            </p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Organized religion is:&nbsp;
                                <span className='Tooltiptext'>How does this religion view, itself!</span>
                            </p>    
                            <p className='Tooltip'>{this.props.religion.OrganizedReligionIs}
                                <span className='Tooltiptext2'>{this.props.religion.OrganizedReligionIsExplanation}</span>
                            </p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center"><p className="Tooltip">Virtues 
                            <span className="Tooltiptext">Things this religion perceives as "good" and desireable</span>
                            </p>
                            {this.loadList('virtues')}
                        </TableCell>
                        <TableCell align="center"><p className="Tooltip">Vices 
                            <span className="Tooltiptext">Things this religion perceives as "bad" and undesrieable</span>
                            </p>
                            {this.loadList('vices')}
                        </TableCell>
                        <TableCell align="center"><p className="Tooltip">Themes 
                            <span className="Tooltiptext2">Things which occur frequently in this religion's tales, stories, and parables. These patterns are often fundamanetal to the religion itself in their own ways.</span>
                            </p>
                            {this.loadList('themes')}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell className="ThirdsCell" align="center" colspan={3}>
                            <p id="SectionCell" className="Tooltip">Structures and Traits <span className="Tooltiptext">Things that can be physically or logically understood of the religion. How it actually operates in practice or other quirks.</span></p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Political Relations:&nbsp; 
                                <span className='Tooltiptext1'>Generally speaking, how does it interact with more "mundane" institutions?</span>
                            </p>    
                            <p>{this.props.religion.PoliticalRelations}</p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Clergy Quirk:&nbsp; 
                                <span className='Tooltiptext1'>Something that most of the clergy members (the people who actually run the religion) share in common.</span>
                            </p>    
                            <p className='Tooltip'>{this.props.religion.ClergyQuirk}
                                <span className='Tooltiptext1'>{this.props.religion.ClergyQuirkExplanation}</span>
                            </p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Main Demographic:&nbsp; 
                                <span className='Tooltiptext1'>What group of people tend to follow this religion the most?</span>
                            </p>    
                            <p className='Tooltip'>{this.props.religion.Demographics}
                            </p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Government Types:  
                                <span className='Tooltiptext1'>What types of government this religion uses to organize itself.</span>
                            </p>    
                        </TableCell>
                        <TableCell align="center" className="ThirdsCell">
                                <p className="Tooltip">Type 1:&nbsp;
                                    <span className="Tooltiptext1">The first "type" of organizational principle this government has. IE "Republic", or "Capitalist"</span>
                                </p>
                                <p className="Tooltip"> {this.props.religion.GovtType[0]}
                                    <span className="Tooltiptext1">{this.props.religion.GovtTypeExplanation[0]}</span>
                                </p>
                            </TableCell>
                            <TableCell align="center" className="ThirdsCell">
                                <p className="Tooltip">Type 2:&nbsp;
                                    <span className="Tooltiptext1">The second "type" of organizational principle this government has. IE "Republic", or "Matriarchy"</span>
                                </p>
                                <p className="Tooltip"> {this.props.religion.GovtType[1]}
                                    <span className="Tooltiptext21">{this.props.religion.GovtTypeExplanation[1]}</span>
                                </p>
                            </TableCell>
                    </TableRow>
                    <TableRow>
                            <TableCell colspan={3}><textarea style={{width: "100%", height: "2rem"}}>Extra Notes</textarea></TableCell>
                    </TableRow>

                </TableBody>
                </Table>
        </TableContainer>
        );
    }
}