export default {
    updateAddress:(state, array) => {state.addressList=array},
    updateSearchProductList:(state, array) => {state.searchProductList=array},
    updateCheckedList:(state, array) => {state.checkedList=[...state.checkedList,...array]},
    setCheckedList:(state, array) => {state.checkedList=array},
    addGoodsNum:(state,index) => {state.checkedList[index].quantity++},
    cutGoodsNum:(state,index) => {
        if(state.checkedList[index].quantity==1){
            state.checkedList.splice(index,1);
        }else{
            state.checkedList[index].quantity--
        }
        
    },
    delGoods:(state,index) => {state.checkedList.splice(index,1)},
    delFiles:(state,index) => {state.Files.splice(index,1)},
    delPicVal:(state,index) => {state.picVal.splice(index,1)},
    setFiles:(state,array) => {state.Files = array},
    setPicVal:(state,array) => {state.picVal = array}

}