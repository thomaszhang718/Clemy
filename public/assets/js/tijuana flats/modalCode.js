var currentOrderArray = [];








$(function(){
    $('#tf-burrito-add').on('submit', function(e) {
        e.preventDefault();

        var itemPrice = 0;

        itemPrice += parseFloat($("input[name=tf-burrito-filling]:checked").data("price"));

        //Getting all toppings into an array
        toppingsArr = [];
        $("input:checkbox[name=tf-burrito-toppings]:checked").each(function(){
            toppingsArr.push($(this).val());
        });

        //Getting all wet sauces into an array
        wetArr = [];
        $("input:checkbox[name=tf-burrito-wet]:checked").each(function(){
            wetArr.push($(this).val());
            itemPrice += parseFloat($("input:checkbox[name=tf-burrito-wet]:checked").data("price"));
        });

        if (!$("input[name=tf-burrito-meal]:checked").val()) {
            console.log("nothing checked")
        }
        else {
            itemPrice += parseFloat($("input[name=tf-burrito-meal]:radio").data("price")); //add price of meal cost
        }

        var data = {
            filling: $("input[name=tf-burrito-filling]:radio").val(),
            tortilla: $("input[name=tf-burrito-tortilla]:radio").val(),
            toppings: toppingsArr.toString(),
            rice: $("input[name=tf-burrito-rice]:radio").val(),
            beans: $("input[name=tf-burrito-beans]:radio").val(),
            wet: wetArr.toString(),
            meal: $("input[name=tf-burrito-meal]:radio").val(),
            mealDrink: $("input[name=tf-burrito-meal-drink]:radio").val(),
            specialRequest: $('#specialRequest').val(),
            itemPrice: itemPrice
        }

        console.log(data);


        $("#cart-total").text(itemPrice);



        currentOrderArray.push(data);

        $('#burrito-modal').modal('toggle');
    });
});

//function to show drink menu if meal selected
$("input[name=tf-burrito-meal]").change(function() {
    if (parseFloat($("input[name=tf-burrito-meal]:checked").data("price")) == 0) {
        $("input[name=tf-burrito-meal-drink]:checked").prop('checked', false); //unchecks drink
        $("#meal-drink").css("display", "none"); //remove drink menu
    } else {
        $("#meal-drink").css("display", "block"); //display drink menu
    }
});