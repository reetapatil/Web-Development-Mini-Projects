import React, { Component } from 'react'

class Filters extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(e) {
        const value = e.target.value
        const name = e.target.name
        this.props.onFilter({
            [name]: value
        });
    }


    render() {
        return (
            <div className="container-fluid">
                <form>
                    <input className="col-md-3" type="text" placeholder="Search..." name="filterText" onChange={this.handleChange} /> <br /> <br />
                </form>
            </div>
        )
    }
}
export default Filters