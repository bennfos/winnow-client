import React, { Component } from 'react'
import ThoughtCard from "./ThoughtCard";
import { Image } from 'semantic-ui-react'
import '../Styles/Pages.css'
import logo from '../../agronomy.png'


class ThoughtList extends Component {
  //Defines initial state
  state = {
    thought: "",
    hide: true
  };



//When component receives new pageId in props (i.e., page is changed) from PageMain, update state in PageMain to cause a rerender of ThoughtList
    componentDidUpdate(prevProps) {
        if (this.props.pageId !== prevProps.pageId) {
          this.props.renderThought(this.props.pageId)
        //set state of thought with thought in props. This helps keep input field consistent with what is on page when user wants to add or edit thought.
          this.setState({
            thought: this.props.thought
          })

        }
      }

  render() {
    return (
      <React.Fragment>
        <div className="thoughtList__contents">
          <div className="thoughtCard__container">
              <ThoughtCard
                {...this.props}
              />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ThoughtList;
