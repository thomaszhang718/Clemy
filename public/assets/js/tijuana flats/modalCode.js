$(document).ready(function() {

    var subtotal = parseFloat(0);
    var totalTax = parseFloat(0);
    var totalPrice = parseFloat(0);
    var salesTax = 0.07;

    var currentOrderArray = [];

    //burrito add function
    $(function(){
        $('#tf-burrito-add').on('submit', function(e) {
            e.preventDefault();

            var itemPrice = 0;

            itemPrice += parseFloat($("input[name=tf-burrito-filling]:checked").data("price"));

            //console.log(itemPrice);

            //Getting all toppings into an array
            toppingsArr = [];
            $("input:checkbox[name=tf-burrito-toppings]:checked").each(function(){
                toppingsArr.push($(this).val());
            });

            //Getting all wet sauces into an array
            wetArr = [];
            $("input:checkbox[name=tf-burrito-wet]:checked").each(function(){
                wetArr.push($(this).val());
                //console.log("Made wet")
                itemPrice += parseFloat($("input:checkbox[name=tf-burrito-wet]:checked").data("price"));
            });

            if (!$("input[name=tf-burrito-meal]:checked").val()) {
                //console.log("nothing checked")
            }
            else {
                //console.log("No meal")
                itemPrice += parseFloat($("input[name=tf-burrito-meal]:checked").data("price")); //add price of meal cost
            }

            var data = {
                filling: $("input[name=tf-burrito-filling]:checked").val(),
                tortilla: $("input[name=tf-burrito-tortilla]:checked").val(),
                toppings: toppingsArr.toString(),
                rice: $("input[name=tf-burrito-rice]:checked").val(),
                beans: $("input[name=tf-burrito-beans]:checked").val(),
                wet: wetArr.toString(),
                meal: $("input[name=tf-burrito-meal]:checked").val(),
                mealDrink: $("input[name=tf-burrito-meal-drink]:checked").val(),
                specialRequest: $('#burrito-specialRequest').val(),
                itemPrice: itemPrice.toFixed(2)
            }

            console.log(data);

            currentOrderArray.push(data);
 
            $("#order-list").append("<span class='checkout-class'>" + data.filling +": $" + data.itemPrice + "</span>&nbsp;&nbsp;<i class='fa fa-times-circle' aria-hidden='true'></i><br>");

            calculateTotalAndTax(itemPrice.toFixed(2));

            $('#burrito-modal').modal('toggle');
        });
    });



    //chips and salsa add function
    $(function(){
        $('.generic-form').on('submit', function(e) {
            e.preventDefault();

            var itemPrice = 0;

            itemPrice = parseFloat(itemPrice) + parseFloat($(this).data("price"));

            var specReqName = $(this).data("specreq");

            var data = {
                item: $(this).data("item"),
                specialRequest: $('#' + specReqName).val(),
                itemPrice: itemPrice.toFixed(2)
            }

            console.log(data);

            currentOrderArray.push(data);

            $("#order-list").append("<span class='checkout-class'>" + data.item +": $" + data.itemPrice + "</span>&nbsp;&nbsp;<i class='fa fa-times-circle' aria-hidden='true'></i><br>");

            calculateTotalAndTax(itemPrice.toFixed(2));

            var modalName = $(this).data("modal");
            $('#' + modalName).modal('toggle');
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


    var calculateTotalAndTax = function(price) {
        
        subtotal = (parseFloat(subtotal) + parseFloat(price)).toFixed(2);
        console.log(subtotal);
        totalTax = (parseFloat(subtotal*salesTax)).toFixed(2);
        console.log(totalTax);

        totalPrice = (parseFloat(subtotal) + parseFloat(totalTax)).toFixed(2);



        $('#subtotal').text("Subtotal: $" + subtotal);
        $('#tax-amount').text("Tax: $" + totalTax);
        $('#cart-total').text("Total: $" + totalPrice);

        console.log(currentOrderArray)
    }





});
