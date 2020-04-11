import React from "react"

class ScrollingSvg extends React.Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {animate: "paused"};
  }
  
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    // Get the position on the page of the SVG
    this.svgLocation = this.svgRef.current.getBoundingClientRect();

    // Scroll offset that triggers animation start.
    // In this case it is the bottom of the SVG.
    this.offsetToTriggerAnimation = this.svgLocation.y + this.svgLocation.height;
  };
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };
  
  handleScroll(event) {
    var viewBottom = window.scrollY + window.innerHeight;
    if (viewBottom > this.offsetToTriggerAnimation) {
      
      this.setState({
        animate: "running"
      });
      
      window.removeEventListener('scroll', this.handleScroll);
    }
  };

  render() {
    return (
      <div ref={this.svgRef}>
        {  React.Children.map(this.props.children, child =>
              React.cloneElement(child, {
                className: child.props.className + ' ' + this.props.className,
                style: {animationPlayState: this.state.animate}
              })
            )
        }
      </div>
    )
  }
}

export default ScrollingSvg;