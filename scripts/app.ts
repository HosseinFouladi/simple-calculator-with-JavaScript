const NumberInput=document.getElementById('input')!as HTMLInputElement;
const Buttons=document.querySelectorAll('.buttons');
const Numbers=document.querySelectorAll('.numbers')
const List=document.querySelector('ul')!as HTMLUListElement;

let number1:number;
let number2:number;
let current_operation:string;
let result_list:Result_Item[]=[];

type Result_Item={
    id:number,
    result:number
}

enum OPERATION{
    SUM,
    SUB,
    DIVISION,
    MULTIPLY
}

Numbers.forEach(num=>{
    num.addEventListener('click',()=>WriteNumbers(num.textContent||''))
})

//print nums into input
const WriteNumbers=(num:string)=>{
    NumberInput.value+=+num;
}

//tell us which operation should be apply when user wants to see result
const determine_operation=(op_number:number)=>{
    number1=+NumberInput.value;
    clear();
    current_operation=OPERATION[op_number];
    NumberInput.focus();
}

const sum=()=>{
    determine_operation(0);
}

const subtract=()=>{
    determine_operation(1);
  }
  
const multiply=()=>{
  determine_operation(2);
  }
  
const division=()=>{
   determine_operation(3);
  }
  
const calculation=()=>{
    number2=+NumberInput.value;
    let result:number=0;

    switch(current_operation){
        case OPERATION[0]:
            result=number1+number2;
            break;
            case OPERATION[1]:
                result=number1-number2;
                break;
                case OPERATION[2]:
                    if(number2===0) 
                        alert('numbers could`nt be divided to zero!');
                    else
                        result=number1/number2;
                        break;
                    case OPERATION[3]:
                        result=number1*number2;
                        break;
    }
    result_list.push({id:Math.floor(Math.random() * 100),result:result})
    renderResult();
    clear();
    //save new Result in localstorage
    storeData();
  }

  const removeResult=(id:number)=>{
    result_list= result_list.filter(result=>result.id!==id);
    renderResult();
    storeData();
  }

  const storeData=(key:string='results')=>{
    localStorage.setItem('results',JSON.stringify(result_list));
  }

  const renderResult=()=>{
    List.innerHTML=''

    result_list.forEach(item=>{
        const li= `<li key=${item.id}><span>${item.result}</span > <i onclick="removeResult(${item.id})" class="fa fa-close"></i></li>`
        List.innerHTML+=li;
    });
  }
  
const clear=()=>{
    NumberInput.value='';
    NumberInput.focus();
  }

  //get results from localstorage when page loads
  const storage_res:Result_Item[]=JSON.parse(localStorage.getItem('results')||'');
  if(storage_res!==undefined){
      result_list=storage_res;
      renderResult();
  }

Buttons[0].addEventListener('click',division);
Buttons[1].addEventListener('click',multiply);
Buttons[2].addEventListener('click',sum);
Buttons[3].addEventListener('click',clear);
Buttons[4].addEventListener('click',calculation);
Buttons[5].addEventListener('click',subtract);

