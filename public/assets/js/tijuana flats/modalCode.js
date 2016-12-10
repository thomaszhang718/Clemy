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

            //console.log(data);

            currentOrderArray.push(data);
 
            $("#order-list").append("<span class='checkout-class'>" + data.filling +": $" + data.itemPrice + "</span>&nbsp;&nbsp;<i class='fa fa-times-circle' aria-hidden='true'></i><br>");

            calculateTotalAndTax(itemPrice.toFixed(2));

            $('#burrito-modal').modal('toggle');
        });
    });

    //generic form function, only has a text box for special requests. The item name and price is grabbed from data attributes of the form
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

            //console.log(data);

            currentOrderArray.push(data);

            $("#order-list").append("<span class='checkout-class'>" + data.item +": $" + data.itemPrice + "</span>&nbsp;&nbsp;<i class='fa fa-times-circle' aria-hidden='true'></i><br>");

            calculateTotalAndTax(itemPrice.toFixed(2));

            var modalName = $(this).data("modal");
            $('#' + modalName).modal('toggle');
        });
    });

    //specific form function, has one input and text box for special requests. The item name and price is grabbed from data attributes of the radio button selected
    $(function(){
        $('.specific-form').on('submit', function(e) {
            e.preventDefault();

            var inputName = $(this).data("inputname");

            var itemPrice = 0;

            itemPrice = parseFloat(itemPrice) + parseFloat($("input[name=" + inputName + "]:checked").data("price"));

            var specReqName = $(this).data("specreq");

            var data = {
                item: $("input[name=" + inputName + "]:checked").val(),
                specialRequest: $('#' + specReqName).val(),
                itemPrice: itemPrice.toFixed(2)
            }

            //console.log(data);

            currentOrderArray.push(data);

            $("#order-list").append("<span class='checkout-class'>" + data.item +": $" + data.itemPrice + "</span>&nbsp;&nbsp;<i class='fa fa-times-circle' aria-hidden='true'></i><br>");

            calculateTotalAndTax(itemPrice.toFixed(2));

            var modalName = $(this).data("modal");
            $('#' + modalName).modal('toggle');
        });
    });

    //beans form function, has size, beans type, and text box to look at
    $(function(){
        $('#tf-beans-add').on('submit', function(e) {
            e.preventDefault();

            var inputName = $(this).data("inputname");
            var beansType = $(this).data("beanstype");

            var itemPrice = 0;

            itemPrice = parseFloat(itemPrice) + parseFloat($("input[name=" + inputName + "]:checked").data("price"));

            var specReqName = $(this).data("specreq");

            var data = {
                item: ($("input[name=" + inputName + "]:checked").val()) + " " + ($("input[name=" + beansType + "]:checked").val()),
                specialRequest: $('#' + specReqName).val(),
                itemPrice: itemPrice.toFixed(2)
            }

            //console.log(data);

            currentOrderArray.push(data);

            $("#order-list").append("<span class='checkout-class'>" + data.item +": $" + data.itemPrice + "</span>&nbsp;&nbsp;<i class='fa fa-times-circle' aria-hidden='true'></i><br>");

            calculateTotalAndTax(itemPrice.toFixed(2));

            var modalName = $(this).data("modal");
            $('#' + modalName).modal('toggle');
        });
    });

    //add drink form function, has size, beans type, and text box to look at
    $(function(){
        $('#tf-drink-add').on('submit', function(e) {
            e.preventDefault();

            var inputName = $(this).data("inputname");
            var drinkType = $(this).data("drinktype");

            var itemPrice = 0;

            itemPrice = parseFloat(itemPrice) + parseFloat($("input[name=" + inputName + "]:checked").data("price"));

            var specReqName = $(this).data("specreq");

            var data = {
                item: ($("input[name=" + inputName + "]:checked").val()) + " " + ($("input[name=" + drinkType + "]:checked").val()),
                specialRequest: $('#' + specReqName).val(),
                itemPrice: itemPrice.toFixed(2)
            }

            //console.log(data);

            currentOrderArray.push(data);

            $("#order-list").append("<span class='checkout-class'>" + data.item +": $" + data.itemPrice + "</span>&nbsp;&nbsp;<i class='fa fa-times-circle' aria-hidden='true'></i><br>");

            calculateTotalAndTax(itemPrice.toFixed(2));

            var modalName = $(this).data("modal");
            $('#' + modalName).modal('toggle');
        });
    });


    $(function(){
        $('#checkoutButton').on('click', function(e) {
            e.preventDefault();

            // grab data from checkout
            var data = {
                subtotal: subtotal,
                totalTax: totalTax,
                totalPrice: totalPrice,
                reservationID: window.location.href.split('/').pop()
            }

            $.ajax({
                type: 'POST',
                url: '/AddItemsToDB/' + window.location.href.split('/').pop(),
                crossDomain: true,
                data: {data: currentOrderArray},
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded"
            }).done(function(result) {
                if (result) {
                    $.post("/confirmOrder", data, function(result2) {
                        window.location.replace(window.location.origin + result2);
                    }); 
                };
            });
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
        //console.log(subtotal);
        totalTax = (parseFloat(subtotal*salesTax)).toFixed(2);
        //console.log(totalTax);

        totalPrice = (parseFloat(subtotal) + parseFloat(totalTax)).toFixed(2);

        $('#subtotal').text("Subtotal: $" + subtotal);
        $('#tax-amount').text("Tax: $" + totalTax);
        $('#cart-total').text("Total: $" + totalPrice);

        //console.log(currentOrderArray);
    }

});
