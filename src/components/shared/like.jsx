import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Tooltip } from 'reactstrap';

class Rent extends React.Component {

    state = {
        tooltipOpen: false
    }

    toggle = () => {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    render() {
        return (
            <div style={{ cursor: 'pointer' }} >
                <FontAwesome 
                    id={'Tooltip' + this.props.id} 
                    style={{ cursor: 'pointer' }} 
                    name="cart-plus" 
                    className="text-info" 
                    size="2x" 
                    onClick={this.props.onRent} />
                <Tooltip 
                    placement="top" 
                    toggle={this.toggle} 
                    isOpen={this.state.tooltipOpen} 
                    target={'Tooltip' + this.props.id}>
                Rent Movie: {this.props.title}
                </Tooltip>
            </div>)
    }
}

export default Rent;