$(document).ready(function(){
    console.log("Ready!");
    $("#sumbitBtn").click(function(){
        var input = $("#pokeInput").val().toLocaleLowerCase();
        console.log(input);  
        var url = "https://pokeapi.co/api/v2/pokemon/" + input;
        $.ajax({
            url : url,
            type : "GET",
            dataType : "json",
            success : function(data){
                
                var name = data.name;
                name = name.toUpperCase();
                var id = data.id;
                var sprite_front = data.sprites.front_default;
                var sprite_back = data.sprites.back_default;
                var stats = [];
                for(var i = 0; i < 6; i++){
                    stats[i] = data.stats[i].base_stat;
                }
                
                var types = [];
                for(var i = 0; i < data.types.length; i++){
                    types[i] = data.types[i].type.name;
                }
                
                var typePoke = types[0];
                if(types[1] != null) typePoke = typePoke + ", " + types[1];
                console.log(sprite_front);
                console.log(sprite_back);
                console.log(types[0]);
                
                $("#dataPoke").css("display", "block");
                $("#id").text(id);
                $("#name").text(name);
                $("#pokeImageFront").attr("src", sprite_front);
                $("#pokeImageBack").attr("src", sprite_back);
                $("#speed").text(stats[0]);
                $("#spdef").text(stats[1]);
                $("#spatk").text(stats[2]);
                $("#def").text(stats[3]);
                $("#atk").text(stats[4]);
                $("#hp").text(stats[5]);
                $("#type").text(typePoke.toLocaleUpperCase());
            },
            error : function(){
                Materialize.toast("Pokemon not found.", 1500, '', function() {
                $("#pokeInput").focus();
            })
            }
        });
    });
});
