export default {
    updateAddress:(state, array) => {state.addressList=array},
    updateSearchProductList:(state, array) => {state.searchProductList=array},
    updateCheckedList:(state, array) => {state.checkedList=[...state.checkedList,...array]},
    addGoodsNum:(state,index) => {state.checkedList[index].quantity++},
    cutGoodsNum:(state,index) => {
        if(state.checkedList[index].quantity==1){
            state.checkedList.splice(index,1);
        }else{
            state.checkedList[index].quantity--
        }
        
    },
    delGoods:(state,index) => {state.checkedList.splice(index,1)}
}