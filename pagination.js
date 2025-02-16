function generatePagination(elementPagination, elements, paged, btnPrevText, btnNextText) {
    let group = 1;
    let selected = group;

    //CLEAR
    let elemItemsOld = $(elements);
    elemItemsOld.removeAttr('data-group');
    $(elementPagination).html('');
    
    const elemItems = $(`${elements}:not(.hidden)`);
    
    //INIT IGNORE HIDDEN
    let elemPagination = $(elementPagination);

    function verifyPagination() {
        const count = elemPagination.find('.number').length;
        const actual = parseInt(elemPagination.find('.number.active').attr('data-pagination'));
    
        const numeroExibicao = $(window).outerWidth() < 1199 ? 2 : 5; // Número de páginas a serem exibidas no array
    
        let array = [];
    
        if (count <= numeroExibicao) {
            // Se o número total de páginas for menor ou igual ao número de exibição, mostre todas as páginas.
            array = Array.from({ length: count }, (_, i) => i + 1);
        } else if (actual < numeroExibicao) {
            // Se a página atual for menor que o número de exibição, mostre as páginas de 1 até o número de exibição.
            array = Array.from({ length: numeroExibicao }, (_, i) => i + 1);
        } else if (actual + numeroExibicao - 1 >= count) {
            // Se a página atual estiver a menos de "numeroExibicao" páginas do final, mostre as últimas "numeroExibicao" páginas.
            array = Array.from({ length: numeroExibicao }, (_, i) => count - numeroExibicao + 1 + i);
        } else {
            // Caso contrário, mostre a página atual e as próximas "numeroExibicao" - 1 páginas.
            array = [actual];
            for (let i = 1; i < numeroExibicao; i++) {
                array.push(actual + i);
            }
        }
    
        // Adicione o último número de paginação se ainda não estiver no array.
        if (!array.includes(count)) {
            array.push(count);
        }
    
        // Adicione o primeiro número de paginação se o último já estiver no array.
        if (array.includes(count) && !array.includes(1)) {
            array.unshift(1);
        }
    
        // Iterar sobre os elementos .number e ocultar/mostrar conforme o array.
        elemPagination.find('.number').each(function(i, e) {
            const numeroPaginacao = parseInt($(e).attr('data-pagination'));
            if (array.includes(numeroPaginacao)) {
                $(e).show(0);
            } else {
                $(e).hide(0);
            }
        });

        // Verifique se o último número não está sendo exibido dentro do intervalo para exibir os "..." antes do último número.
        if (array[array.length - 2] < count - 1) {
            elemPagination.find('.number-last').show(0);
        } else {
            elemPagination.find('.number-last').hide(0);
        }
        
        // Verifique se o primeiro número não está sendo exibido dentro do intervalo para exibir os "..." antes do primeiro número.
        if (array[1] != 2) {
            elemPagination.find('.number-first').show(0);
        } else {
            elemPagination.find('.number-first').hide(0);
        }
    }

    (function loaded() {
        let count = 0;
        let max = elemItems.length - 1;

        elemItems.each(function(i) {
            $(this).attr('data-group', group);

            if( group == 1 ) {
                $(this).show(0);
            } else {
                $(this).hide(0);
            }

            count++;
            if( count == paged ) {
                count = 0;

                if( i != max) {
                    group++;
                }
            }
        });
    })();

    (function generatePagination(){
        if( group != 1 ) {
            elemPagination.show(0);
            
            let paginationContent = $('<div class="numbers"></div>');
            
            for (var i = 1; i <= group; i++) {
                let classActive = i == 1 ? 'active' : '';
                
                if( i == group ) {
                    paginationContent.append('<span class="number-last" style="display: none;">...</span>');
                }
                
                paginationContent.append(`<button class="number ${classActive}" data-pagination="${i}">${i}</button>`);
                
                if( i == 1 ) {
                    paginationContent.append('<span class="number-first" style="display: none;">...</span>');
                }
            }
            
            elemPagination.prepend(`<button class="prev" disabled>${btnPrevText}</button>`);
            elemPagination.append(paginationContent);
            elemPagination.append(`<button class="next">${btnNextText}</button>`);

            verifyPagination();
        } else {
            elemPagination.hide(0);
        }
    })();

    (function getPagination() {
        function checkButtonsDisabled() {
            //TOGGLE BUTTONS DISABLED
            elemPagination.find('button.prev').attr('disabled', false);
            elemPagination.find('button.next').attr('disabled', false);

            if( selected == 1 ) {
                elemPagination.find('button.prev').attr('disabled', true);
            }
            
            if( selected == group ) {
                elemPagination.find('button.next').attr('disabled', true);
            }

            verifyPagination();
        }

        elemPagination.find('button.number').click(function() {
            event.preventDefault();

            if( !$(this).hasClass('active') && !$(this).is(":disabled") ) {
                //TOGGLE ACTIVE
                elemPagination.find('button.number').removeClass('active');
                $(this).addClass('active');

                //TOGGLE LIST
                selected = $(this).attr('data-pagination');
                elemItems.hide(0);
                $(`${elements}[data-group=${selected}]`).show(0);

                checkButtonsDisabled();
            }
        });

        elemPagination.find('button.prev').click(function() {
            event.preventDefault();

            if( !$(this).hasClass('active') && !$(this).is(":disabled") ) {
                if( selected != 1) {
                    selected--;

                    elemItems.hide(0);
                    $(`${elements}[data-group=${selected}]`).show(0);
                    $(`${elementPagination} button.number`).removeClass('active');
                    $(`${elementPagination} button.number[data-pagination=${selected}]`).addClass('active');
                    checkButtonsDisabled();
                }
            }
        });

        elemPagination.find('button.next').click(function() {
            event.preventDefault();

            if( !$(this).hasClass('active') && !$(this).is(":disabled") ) {
                if( selected != group) {
                    selected++;

                    elemItems.hide(0);
                    $(`${elements}[data-group=${selected}]`).show(0);
                    $(`${elementPagination} button.number`).removeClass('active');
                    $(`${elementPagination} button.number[data-pagination=${selected}]`).addClass('active');
                    checkButtonsDisabled();
                }
            }
        });
    })();
}