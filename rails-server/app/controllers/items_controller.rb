class ItemsController < ApplicationController
  def index
    render json: Item.all
  end

  def create 
    item = Item.new(item_params)
    if item.save
      render json: item
    else 
      render json: { error: "item could not be created" }, status: :not_acceptable
    end
  end

  def update
    item = Item.find_by(id: params[:id])
    if item.update(item_params)
      render json: item
    else 
      render json: { error: "could not update item" }, status: :not_acceptable
    end
  end

  def destroy
    item = Item.find_by(id: params[:id])
    if item.destroy
      render json: { success: "item destroyed"}
    else
      render json: { error: "could not destroy item" }, status: :not_acceptable
    end 
  end 

  private

  def item_params
    params.require(:item).permit(:name, :description, :valid_until)
  end
end
