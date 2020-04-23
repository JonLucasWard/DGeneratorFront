import * as React from 'react';

export class Civilization extends React.Component {
    constructor(props){
        super(props);
        this.civilization = props.civilization;
        this.number = props.number;
        //this.props = {
            // number: null,
            // civilization: {
            //     GovtType: [],
            //     GovtTypeExplanation: [], 
            //     Biome: {
            //         PopulationDistribution: null,
            //         Biomes: [],
            //         BiomesExplanations:[]
            //     },
            //     AreaControl:null, AreaControlExplanation: null,
            //     PopulationTrait:null,
            //     MajoritiesAndMinorities:null, MnMList:[],
            //     TransportationInfrastructure:null,
            //     EnergyInfrastructure:null, EnergyInfrastructureExplanation:null,
            //     GovtReligiousRelations:null, GovtReligiousRelationsExplanation:null,
            //     EconomicFocus:null, EconomicFocusExplanation:null,
            //     GenderRelations:null, GenderRelationsExplanation:null,
            //     MagicOrTechRelations:null, MagicOrTechRelationsExplanation:null,
            //     ForeignRelations:null, ForeignRelationsExplanation:null,
            //     MilitarySpecialty:null, MilitarySpecialtyExplanation:null,
            //     FrequentIssue:null, FrequentIssueExplanation:null,
            //     PopularIssue:null, MajorCulturalValue:null, MajorCulturalTaboo:null, MajorCulturalIssue:null,
            //     Literacy:null, PowerScale: null

            // }
        //}
    }
    start(e){
        let holdMe = Object.keys(this.props.civilization[e]).map(key =>
            <li key = {key}>{this.props.civilization[e][key]}</li>
        );

        return holdMe;
    }
    startB(){
        let holdMe = Object.keys(this.props.civilization.Biome.Biomes).map(key =>
            <li key = {key}>{this.props.civilization.Biome.Biomes[key]}</li>
        );
        
        return holdMe;
    }


    render(){
        return (
            <div style={{"backgroundColor": "yellow"}}>
            <p>This is civilization: {this.props.number}</p>
            <ul>
                <p>GovtTypes</p>
                {this.start("GovtType")}
            </ul>
            <p>Population Distribution: {this.props.civilization.Biome.PopulationDistribution}</p>
            <ul>
                {this.startB()}
            </ul>
            <p>Area Control: {this.props.civilization.AreaControl}</p>
            <p>Population Trait: {this.props.civilization.PopulationTrait}</p>
            <p>Majorities and Minorities: {this.props.civilization.MajoritiesAndMinorities}</p>
            <ul>
                {this.start("MnMList")}
            </ul>
            <p>Transportation Infrastructure: {this.props.civilization.TransportationInfrastructure}</p>
            <p>Energy Infrastructure: {this.props.civilization.EnergyInfrastructure}</p>
            <p>Religious Relations: {this.props.civilization.GovtReligiousRelations}</p>
            <p>Economic Focus: {this.props.civilization.EconomicFocus}</p>
            <p>Gender Relations: {this.props.civilization.GenderRelations}</p>
            <p>Magic/Tech Policy: {this.props.civilization.MagicOrTechRelations}</p>
            <p>Foreign Relations: {this.props.civilization.ForeignRelations}</p>
            <p>Military Specialty: {this.props.civilization.MilitarySpecialty}</p>
            <p>Frequent Issue: {this.props.civilization.FrequentIssue}</p>
            <p>Popular Issue: {this.props.civilization.PopularIssue}</p>
            <p>Major Cultural Value: {this.props.civilization.MajorCulturalValue}</p>
            <p>Major Cultural Taboo: {this.props.civilization.MajorCulturalTaboo}</p>
            <p>Major Cultural Issue: {this.props.civilization.MajorCulturalIssue}</p>
            <p>Literacy % of Population: {this.props.civilization.Literacy}</p>
            <p>Power Ranking of Nation: #{this.props.civilization.PowerScale}</p>

            </div>
        )
    }
}