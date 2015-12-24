var React = require('react');
var ReactRouter = require('react-router');
var ApiUtil = require('../../util/api_util.js');
var StepStore = require('../../stores/step_store.js');
var AnnotationForm = require('../annotations/annotation_form.jsx');

var StepDetail = React.createClass({
  getInitialState: function(){
    return { step: null };
  },

  getStepFromStore: function () {
    return StepStore.find(parseInt(this.props.params.stepId));
  },

  _onChange: function () {
    this.setState({step: this.getStepFromStore()});
  },

  componentDidMount: function(){
    ApiUtil.fetchStepsForRecipe(this.props.params.recipeId);
    this.stepListener = StepStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.stepListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    var newStepId = newProps.params.stepId;
    this.setState({step: StepStore.find(newStepId)});
  },

  render: function () {
    // var step = this.getStepFromStore() || this.state.step;
    var step = this.state.step;
    if (step === null) { return <div></div>; }
    if (step.annotations.length === 0) {
      return (
        <div>
          <div>No annotations yet!</div>
          <AnnotationForm stepId={this.state.step.id}/>
        </div>
      );
    }

    return(
      <div>
        <p>Annotations:</p>
        <ul>{step.annotations.map(function (annotation) {
          return(
            <div key={annotation.id}>
              <div>{annotation.body}</div>
              <div>by: {annotation.author_name} on: {annotation.created_at.split("T")[0]}</div>
              <br></br>
            </div>
          );
        })}
        </ul>
        <br></br>
        <AnnotationForm stepId={this.state.step.id}/>
      </div>
    );
  }

  // goal is to create StepAnnotations component, which will contain:
  // 1) iterated list of all annotations associated with the step
  // 2) form for creating new annotation associated with the step
});

module.exports = StepDetail;
