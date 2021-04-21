import React from 'react';
import Review from './Review';
import NewReviewModal from './NewReviewModal';





class Reviews extends React.Component {
  constructor(props){
    super(props);
    this.closeModal= this.closeModal.bind(this)
    this.state={
      reviewsToShow: this.props.reviews,
      length:2,
      renderbutton: true,
      modalIsOpen: false,
    }
  }

  closeModal(){
    this.setState({modalIsOpen:false})
  }

  sortReviews(index){
    var array = [...this.state.reviewsToShow];
    if(index===0){
      var storage={};
      array.sort((a,b)=> (a.date<b.date) ? 1: -1)
      for (var i=0; i<array.length; i++){
        storage[array[i].reviewerName]= i;
      }
      array= [...array]

      for (var i=0; i<array.length; i++){
        storage[array[i].reviewerName]= storage[array[i].reviewerName]- (array[i].helpfulness/4)
      }
      array.sort((a,b)=> (storage[a.reviewerName]> storage[b.reviewerName]) ? 1: -1)
      this.setState({reviewsToShow: array})
    }else if (index === 2){
      array.sort((a,b)=> (a.date<b.date) ? 1: -1)
      this.setState({reviewsToShow: array})
    }else if(index ===1){
      array.sort((a,b)=> (a.helpfulness<b.helpfulness) ? 1: -1)
      this.setState({reviewsToShow: array})
    }

  }


  showMore(){
    this.setState({length: this.state.length + 2});
    if (this.state.length>= this.props.reviews.length){
      this.setState({renderbutton: false})
    }
  }

  render(){
     if (! this.props.reviews) {
      return <div>loading...</div>
    }
    var reviews= this.state.reviewsToShow.slice(0,this.state.length)
    return (
    <div>
      <span>{reviews.length} reviews, sorted by </span><select onChange= {(event)=> this.sortReviews(event.target.selectedIndex)}> <option>Relevant</option><option>Helpful</option><option>Newest</option></select>
      {reviews.map((review)=> <Review review={review}/>)}
      {reviews.length >0 ? (this.state.renderbutton ? <button onClick={(event)=>{this.showMore()}}> More Reviews </button> : <div></div>): <div></div> }
      <button onClick= {(event)=> this.setState({modalIsOpen:true})}>Add A Review</button>
      <NewReviewModal  close={this.closeModal} isOpen= {this.state.modalIsOpen} productName= {this.props.product.name}/>
    </div>)
  }


}

export default Reviews;